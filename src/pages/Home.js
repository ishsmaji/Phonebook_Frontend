import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import { toast } from 'react-toastify';

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/contacts`, {
          headers: { 'x-auth-token': user.token }
        });
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        toast.error('Error fetching contacts');
      }
    };

    if (user) {
      fetchContacts();
    }
  }, [user]);

  const addContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const updateContact = (updatedContact) => {
    setContacts(contacts.map(contact => 
      contact._id === updatedContact._id ? updatedContact : contact
    ));
  };

  return (
    <div className="container mx-auto p-4">
      
      <ContactForm 
        onContactAdded={addContact} 
        onContactUpdated={updateContact}
        editingContact={editingContact}
        setEditingContact={setEditingContact}
      />
      <ContactList 
        contacts={contacts} 
        setContacts={setContacts} 
        setEditingContact={setEditingContact}
      />
    </div>
  );
};

export default Home;