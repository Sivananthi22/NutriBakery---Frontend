import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const messagesPerPage = 3; // Displaying 3 messages per page

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/contact/messages');
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
                setError('Failed to load messages.');
            }
        };

        fetchMessages();
    }, []);

    const indexOfLastMessage = currentPage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

    const totalPages = Math.ceil(messages.length / messagesPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="flex h-screen">
            <AdminSidebar />
            <div className="flex-1 p-8 bg-gradient-to-b from-[#FFF5EB] to-[#FFEDE4]">
                <h1 className="text-4xl font-bold text-[#915F57] mb-8">Messages</h1>

                {/* Messages Table */}
                <div className="overflow-auto rounded-lg shadow-lg">
                    <table className="min-w-full bg-white rounded-lg border border-[#915F57]">
                        <thead className="bg-[#F4E8DB] border-b border-[#915F57]">
                            <tr>
                                <th className="px-6 py-4 text-left text-[#915F57] border-r border-[#915F57]">Name</th>
                                <th className="px-6 py-4 text-left text-[#915F57] border-r border-[#915F57]">Email</th>
                                <th className="px-6 py-4 text-left text-[#915F57] border-r border-[#915F57]">Subject</th>
                                <th className="px-6 py-4 text-left text-[#915F57] border-r border-[#915F57]">Message</th>
                                <th className="px-6 py-4 text-left text-[#915F57] border-r border-[#915F57]">Date</th>
                                <th className="px-6 py-4 text-left text-[#915F57]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMessages.map((message) => (
                                <tr key={message._id} className="hover:bg-[#FDF1EC] transition-colors border-b border-[#f4e8db]">
                                    <td className="px-6 py-4 text-[#915F57] border-r border-[#915F57]">{message.name}</td>
                                    <td className="px-6 py-4 text-[#915F57] border-r border-[#915F57]">{message.email}</td>
                                    <td className="px-6 py-4 text-[#915F57] border-r border-[#915F57]">{message.subject}</td>
                                    <td className="px-6 py-4 text-[#915F57] border-r border-[#915F57]">{message.message}</td>
                                    <td className="px-6 py-4 text-[#915F57] border-r border-[#915F57]">{new Date(message.createdAt).toLocaleString()}</td>
                                    <td className="px-6 py-4 flex justify-center">
                                        <button
                                            className="px-4 py-2 rounded-full bg-[#915F57] text-white hover:bg-[#a0674b] transition duration-200"
                                        >
                                            Mark as Read
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        className={`px-4 py-2 rounded-full ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#915F57] text-white hover:bg-[#a0674b]'} transition duration-200`}
                        onClick={prevPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="text-[#915F57] font-semibold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className={`px-4 py-2 rounded-full ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#915F57] text-white hover:bg-[#a0674b]'} transition duration-200`}
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminMessages;
