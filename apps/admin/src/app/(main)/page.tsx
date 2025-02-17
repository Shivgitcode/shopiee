"use client";
import React, { useState } from "react";
import {
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  Send,
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createChat, getMessages, getUsers } from "@/actions/server";
import { Message, Conversation } from "@/utils/types";
import { recieverId } from "@/utils/util";

function App() {
  const [activeTab, setActiveTab] = useState("messages");
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState<string | null>(
    "clyb4fxin00001plerlypglcn"
  );
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "John Doe",
      content: "Hello, I need help with my order",
      timestamp: "10:30 AM",
      isAdmin: false,
    },
    {
      id: 2,
      sender: "Admin",
      content: "Hi John, how can I assist you today?",
      timestamp: "10:31 AM",
      isAdmin: true,
    },
  ]);

  const query = useQuery({
    queryKey: ["customers"],
    queryFn: getUsers,
  });
  const query2 = useQuery<Conversation>({
    queryKey: ["messages"],
    queryFn: async () => {
      return (await getMessages({ senderId: selectedChat as string }))
        .currentConversation;
    },
  });
  const mutationOne = useMutation({
    mutationFn: createChat,
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const handleSelectedChat = async (id: string) => {
    setSelectedChat(id);
    query2.refetch();
  };

  console.log(query2.data);
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    // const newMsg: Message = {
    //   id: messages.length + 1,
    //   sender: "Admin",
    //   content: newMessage,
    //   timestamp: new Date().toLocaleTimeString([], {
    //     hour: "2-digit",
    //     minute: "2-digit",
    //   }),
    //   isAdmin: true,
    // };
    mutationOne.mutate({
      senderId: recieverId,
      receiverId: selectedChat as string,
      body: newMessage,
    });

    // setMessages([...messages, newMsg]);
    setNewMessage("");
  };
  if (query.isLoading) return <div>Loading ....</div>;
  if (query.isError) return <div>oops error occured {query.error.message}</div>;
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <a
            onClick={() => setActiveTab("messages")}
            className={`flex items-center px-4 py-3 cursor-pointer ${
              activeTab === "messages"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <MessageSquare className="w-5 h-5 mr-3" />
            Messages
          </a>
          <a
            onClick={() => setActiveTab("customers")}
            className={`flex items-center px-4 py-3 cursor-pointer ${
              activeTab === "customers"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            Customers
          </a>
          <a
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center px-4 py-3 cursor-pointer ${
              activeTab === "analytics"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <BarChart3 className="w-5 h-5 mr-3" />
            Analytics
          </a>
          <a
            onClick={() => setActiveTab("settings")}
            className={`flex items-center px-4 py-3 cursor-pointer ${
              activeTab === "settings"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 flex-1 max-w-xl">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 bg-transparent border-none focus:outline-none flex-1"
              />
            </div>
            <div className="flex items-center">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
              </button>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Admin"
                className="w-8 h-8 rounded-full ml-4"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-gray-100">
          {activeTab === "messages" && (
            <div className="bg-white rounded-lg shadow h-[calc(100vh-8rem)] flex">
              {/* Customer List */}
              <div className="w-64 border-r">
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Conversations
                  </h2>
                </div>
                <div className="overflow-y-auto">
                  {query.data?.map((customer) => (
                    <div
                      key={customer.id}
                      onClick={() => handleSelectedChat(customer.id)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 ${
                        selectedChat === customer.name ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <img
                          src={`${customer.image}`}
                          alt={customer.name as string}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-3">
                          <p className="font-medium text-gray-800">
                            {customer.name}
                          </p>
                          <p className="text-sm text-gray-500">active</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {selectedChat ? (
                  <>
                    <div className="p-4 border-b">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {selectedChat}
                      </h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {query2.data?.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender.name === "admin" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-xs px-4 py-2 rounded-lg ${
                              message.sender.name === "admin"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <p>{message.body}</p>
                            <p className="text-xs mt-1 opacity-75">
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleSendMessage()
                          }
                        />
                        <button
                          onClick={handleSendMessage}
                          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    Select a conversation to start messaging
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "customers" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                Customer Management
              </h2>
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {query.data?.map((customer) => (
                    <tr key={customer.id} className="border-b">
                      <td className="py-3 px-4">{customer.name}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            "active" === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          active
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-800">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                Analytics Dashboard
              </h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800">
                    Total Customers
                  </h3>
                  <p className="text-3xl font-bold text-blue-600 mt-2">1,234</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="text-lg font-medium text-green-800">
                    Active Chats
                  </h3>
                  <p className="text-3xl font-bold text-green-600 mt-2">23</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="text-lg font-medium text-purple-800">
                    Response Rate
                  </h3>
                  <p className="text-3xl font-bold text-purple-600 mt-2">95%</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Notification Settings
                  </label>
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2">Email notifications</span>
                    </label>
                  </div>
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2">Desktop notifications</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Language
                  </label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
