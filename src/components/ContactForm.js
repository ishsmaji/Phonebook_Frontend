import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactForm = ({ onContactAdded, onContactUpdated, editingContact, setEditingContact }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setPhone(editingContact.phone);
      setAddress(editingContact.address);
    }
  }, [editingContact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editingContact) {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/contacts/${editingContact._id}`, { name, phone , address }, {
          headers: { 'x-auth-token': token }
        });
        onContactUpdated(response.data);
        setEditingContact(null);
        toast.success('Contact updated successfully');
      } else {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/contacts`, { name, phone , address }, {
          headers: { 'x-auth-token': token }
        });
        onContactAdded(response.data);
        toast.success('Contact added successfully');
      }
      setName('');
      setPhone('');
      setAddress('');
    } catch (error) {
      console.error('Error adding/updating contact:', error);
      toast.error('Error adding/updating contact');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        {editingContact ? 'Update Contact' : 'Add Contact'}
      </button>
      {editingContact && (
        <button
          type="button"
          onClick={() => {
            setEditingContact(null);
            setName('');
            setPhone('');
            setAddress('');
          }}
          className="w-full mt-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
};

export default ContactForm;