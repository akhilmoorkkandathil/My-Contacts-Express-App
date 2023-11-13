const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactmodel')


//@desc Get all contacts
//@router Get /api/contacts
//@acess private
const getContacts = asyncHandler(async(req,res)=>{
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts)
})
//@desc Create contacts
//@router Post /api/contacts
//@acess private
const creatContact = asyncHandler(async(req,res)=>{
    console.log(req.body);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error('All fields are mandatory')
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
    })
    res.status(201).json(contact)
})
//@desc Get a contact
//@router Get /api/contacts/:id
//@acess private
const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})
//@desc update a contact
//@router put /api/contacts/:id
//@acess private
const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User don't have the permission to update the user contacts")
    }
    const updateContact =await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(201).json(updateContact)
})

//@desc Delete a contact
//@router Delete /api/contacts/:id
//@acess private
const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User don't have the permission to update the user contacts")
    }
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(Contact);
})

module.exports = {getContacts,creatContact,getContact,updateContact,deleteContact}