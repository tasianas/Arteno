import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Users, Mail, Key, Calendar, CreditCard as Edit2, Save, X, Package, Image as ImageIcon, MessageSquare, Clock as ClockIcon, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ImageUpload } from './ImageUpload';
import { SingleImageUpload } from './SingleImageUpload';

interface User {
  id: string;
  email: string;
  password: string;
  type: string;
  created_at: string;
  last_login: string | null;
}

interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  image: string;
  description: string;
  long_description: string | null;
  images: string | null;
}

interface ContactMessage {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  project_type: string;
  message: string;
  read: boolean;
  created_at: string;
}

interface AdminPanelProps {
  onBack: () => void;
  onLogoClick: () => void;
  onSignOut: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack, onLogoClick, onSignOut }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'products' | 'messages'>('users');

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', password: '' });
  const [addingUser, setAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ email: '', password: '', type: 'user' });
  const [updatingUser, setUpdatingUser] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    code: '',
    name: '',
    category: '',
    image: '',
    description: '',
    long_description: '',
    images: [] as string[]
  });
  const [addingProduct, setAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editProductForm, setEditProductForm] = useState({
    code: '',
    name: '',
    category: '',
    image: '',
    description: '',
    long_description: '',
    images: [] as string[]
  });
  const [updatingProduct, setUpdatingProduct] = useState(false);

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchMessages();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('authorized_users')
        .select('id, email, password, type, created_at, last_login')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', messageId);

      if (error) throw error;
      fetchMessages();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;
      setSelectedMessage(null);
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingUser(true);
    setError('');
    setSuccess('');

    if (!newUser.email || !newUser.password) {
      setError('Email and password are required');
      setAddingUser(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('authorized_users')
        .insert([{ 
          email: newUser.email.trim(), 
          password: newUser.password 
        }])
        .select();

      if (error) throw error;

      setSuccess(`User ${newUser.email} added successfully!`);
      setNewUser({ email: '', password: '' });
      setShowAddForm(false);
      fetchUsers(); // Refresh the list
    } catch (error: any) {
      console.error('Error adding user:', error);
      if (error.code === '23505') {
        setError('A user with this email already exists');
      } else {
        setError(error.message || 'Failed to add user');
      }
    } finally {
      setAddingUser(false);
    }
  };

  const handleDeleteUser = async (userId: string, email: string) => {
    if (!confirm(`Are you sure you want to delete user: ${email}?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('authorized_users')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      setSuccess(`User ${email} deleted successfully!`);
      fetchUsers(); // Refresh the list
    } catch (error: any) {
      console.error('Error deleting user:', error);
      setError(error.message || 'Failed to delete user');
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user.id);
    setEditForm({ email: user.email, password: user.password, type: user.type });
    setError('');
    setSuccess('');
  };

  const handleUpdateUser = async (userId: string) => {
    setUpdatingUser(true);
    setError('');
    setSuccess('');

    if (!editForm.email || !editForm.password || !editForm.type) {
      setError('Email, password, and type are required');
      setUpdatingUser(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('authorized_users')
        .update({ 
          email: editForm.email.trim(), 
          password: editForm.password,
          type: editForm.type
        })
        .eq('id', userId)
        .select();

      if (error) throw error;

      setSuccess(`User updated successfully!`);
      setEditingUser(null);
      fetchUsers(); // Refresh the list
    } catch (error: any) {
      console.error('Error updating user:', error);
      if (error.code === '23505') {
        setError('A user with this email already exists');
      } else {
        setError(error.message || 'Failed to update user');
      }
    } finally {
      setUpdatingUser(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditForm({ email: '', password: '', type: 'user' });
    setError('');
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products');
    } finally {
      setProductsLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingProduct(true);
    setError('');
    setSuccess('');

    if (!newProduct.code || !newProduct.name || !newProduct.category || !newProduct.image || !newProduct.description) {
      setError('Code, name, category, image, and description are required');
      setAddingProduct(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          id: newProduct.code,
          code: newProduct.code,
          name: newProduct.name,
          category: newProduct.category,
          image: newProduct.image,
          description: newProduct.description,
          long_description: newProduct.long_description || null,
          images: newProduct.images.length > 0 ? JSON.stringify(newProduct.images) : null
        }])
        .select();

      if (error) throw error;

      setSuccess(`Product ${newProduct.name} added successfully!`);
      setNewProduct({
        code: '',
        name: '',
        category: '',
        image: '',
        description: '',
        long_description: '',
        images: []
      });
      setShowAddProductForm(false);
      fetchProducts();
    } catch (error: any) {
      console.error('Error adding product:', error);
      if (error.code === '23505') {
        setError('A product with this code already exists');
      } else {
        setError(error.message || 'Failed to add product');
      }
    } finally {
      setAddingProduct(false);
    }
  };

  const handleDeleteProduct = async (productId: string, productName: string) => {
    if (!confirm(`Are you sure you want to delete product: ${productName}?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      setSuccess(`Product ${productName} deleted successfully!`);
      fetchProducts();
    } catch (error: any) {
      console.error('Error deleting product:', error);
      setError(error.message || 'Failed to delete product');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product.id);
    let parsedImages: string[] = [];
    if (product.images) {
      try {
        parsedImages = JSON.parse(product.images);
      } catch {
        parsedImages = [];
      }
    }
    setEditProductForm({
      code: product.code,
      name: product.name,
      category: product.category,
      image: product.image,
      description: product.description,
      long_description: product.long_description || '',
      images: parsedImages
    });
    setError('');
    setSuccess('');
  };

  const handleUpdateProduct = async (productId: string) => {
    setUpdatingProduct(true);
    setError('');
    setSuccess('');

    if (!editProductForm.code || !editProductForm.name || !editProductForm.category || !editProductForm.image || !editProductForm.description) {
      setError('Code, name, category, image, and description are required');
      setUpdatingProduct(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          code: editProductForm.code,
          name: editProductForm.name,
          category: editProductForm.category,
          image: editProductForm.image,
          description: editProductForm.description,
          long_description: editProductForm.long_description || null,
          images: editProductForm.images.length > 0 ? JSON.stringify(editProductForm.images) : null
        })
        .eq('id', productId)
        .select();

      if (error) throw error;

      setSuccess(`Product updated successfully!`);
      setEditingProduct(null);
      fetchProducts();
    } catch (error: any) {
      console.error('Error updating product:', error);
      setError(error.message || 'Failed to update product');
    } finally {
      setUpdatingProduct(false);
    }
  };

  const handleCancelProductEdit = () => {
    setEditingProduct(null);
    setEditProductForm({
      code: '',
      name: '',
      category: '',
      image: '',
      description: '',
      long_description: '',
      images: []
    });
    setError('');
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-sm border-b z-40" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', borderColor: '#333' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={onBack}
              className="text-gray-300 hover:text-white transition-colors"
            >
              ← Back
            </button>
            
            <button
              onClick={onLogoClick}
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src="https://rteznkwgofrhunwtwamk.supabase.co/storage/v1/object/public/media/2880726A-8DC4-4EA4-9E98-4D57812AD32E2%20(1).png" 
                alt="ARTENO"
                className="h-16 w-auto"
              />
            </button>

            <button
              onClick={onSignOut}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Admin Panel
            </h1>
            <p className="text-gray-300">Manage users and products for the ARTENO platform</p>
          </div>

          {/* Tabs */}
          <div className="mb-8 border-b border-gray-700">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('users')}
                className={`pb-4 px-2 font-semibold transition-colors border-b-2 ${
                  activeTab === 'users'
                    ? 'border-[#D7B387] text-[#D7B387]'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <Users className="inline h-5 w-5 mr-2" />
                Users
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`pb-4 px-2 font-semibold transition-colors border-b-2 ${
                  activeTab === 'products'
                    ? 'border-[#D7B387] text-[#D7B387]'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <Package className="inline h-5 w-5 mr-2" />
                Products
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`pb-4 px-2 font-semibold transition-colors border-b-2 ${
                  activeTab === 'messages'
                    ? 'border-[#D7B387] text-[#D7B387]'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <MessageSquare className="inline h-5 w-5 mr-2" />
                Messages
                {messages.filter(m => !m.read).length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {messages.filter(m => !m.read).length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Messages */}
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-red-400">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <p className="text-green-400">{success}</p>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <>
              {/* Add User Button */}
              <div className="mb-8">
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-[#D7B387] text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors flex items-center"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add New User
                </button>
              </div>

          {/* Add User Form */}
          {showAddForm && (
            <div className="mb-8 bg-gray-900 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Add New User</h3>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    <Mail className="inline mr-2 h-4 w-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387]"
                    placeholder="user@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    <Key className="inline mr-2 h-4 w-4" />
                    Password
                  </label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387]"
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={addingUser}
                    className="bg-[#D7B387] text-black px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-colors disabled:opacity-50"
                  >
                    {addingUser ? 'Adding...' : 'Add User'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setNewUser({ email: '', password: '' });
                      setError('');
                    }}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Users List */}
          <div className="bg-gray-900 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Authorized Users ({users.length})</h3>
            </div>
            
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D7B387] mx-auto mb-4"></div>
                <p className="text-gray-300">Loading users...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="p-8 text-center">
                <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No users found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {users.map((user) => (
                      <tr key={user.id} className={editingUser === user.id ? "bg-gray-800/50" : "hover:bg-gray-800"}>
                        {editingUser === user.id ? (
                          <>
                            <td className="px-6 py-6 whitespace-nowrap" colSpan={5}>
                              <div className="bg-gray-800 rounded-lg p-6 border border-[#D7B387]/30">
                                <h4 className="text-white font-semibold mb-4 flex items-center">
                                  <Edit2 className="h-4 w-4 mr-2 text-[#D7B387]" />
                                  Edit User
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                  <div>
                                    <label className="block text-xs text-gray-400 mb-2">Email</label>
                                    <div className="flex items-center">
                                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                                      <input
                                        type="email"
                                        value={editForm.email}
                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        className="flex-1 bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387] text-sm"
                                        placeholder="user@example.com"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-400 mb-2">Password</label>
                                    <div className="flex items-center">
                                      <Key className="h-4 w-4 text-gray-400 mr-2" />
                                      <input
                                        type="password"
                                        value={editForm.password}
                                        onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                                        className="flex-1 bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387] text-sm"
                                        placeholder="Enter password"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-400 mb-2">User Type</label>
                                    <select
                                      value={editForm.type}
                                      onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                                      className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387] text-sm"
                                    >
                                      <option value="user">User</option>
                                      <option value="admin">Admin</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() => handleUpdateUser(user.id)}
                                    disabled={updatingUser}
                                    className="bg-[#D7B387] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#c49f6c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                  >
                                    <Save className="h-4 w-4 mr-2" />
                                    {updatingUser ? 'Saving...' : 'Save Changes'}
                                  </button>
                                  <button
                                    onClick={handleCancelEdit}
                                    className="bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center"
                                  >
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-white">{user.email}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                user.type === 'admin'
                                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                  : 'bg-green-500/20 text-green-400 border border-green-500/30'
                              }`}>
                                {user.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-300 text-sm">{formatDate(user.created_at)}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-gray-300 text-sm">{formatDate(user.last_login)}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleEditUser(user)}
                                  className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center text-sm font-medium"
                                  title="Edit user"
                                >
                                  <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(user.id, user.email)}
                                  className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg hover:bg-red-500/30 transition-colors flex items-center text-sm font-medium"
                                  title="Delete user"
                                >
                                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                                  Delete
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
            </>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <>
              {/* Add Product Button */}
              <div className="mb-8">
                <button
                  onClick={() => setShowAddProductForm(!showAddProductForm)}
                  className="bg-[#D7B387] text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors flex items-center"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add New Product
                </button>
              </div>

              {/* Add Product Form */}
              {showAddProductForm && (
                <div className="mb-8 bg-gray-900 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">Add New Product</h3>
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Product Code (ID)</label>
                        <input
                          type="text"
                          value={newProduct.code}
                          onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387]"
                          placeholder="e.g., A001"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Product Name</label>
                        <input
                          type="text"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387]"
                          placeholder="Product name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Category</label>
                        <input
                          type="text"
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387]"
                          placeholder="e.g., Tiles, Stones"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">
                          <ImageIcon className="inline mr-2 h-4 w-4" />
                          Main Image
                        </label>
                        <SingleImageUpload
                          currentImage={newProduct.image}
                          onImageChange={(imageUrl) => setNewProduct({ ...newProduct, image: imageUrl })}
                          label="Main Image"
                        />
                        <input
                          type="url"
                          value={newProduct.image}
                          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387] mt-2"
                          placeholder="Or enter URL: https://..."
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Short Description</label>
                      <textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387]"
                        placeholder="Brief product description"
                        rows={2}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Long Description (Optional)</label>
                      <textarea
                        value={newProduct.long_description}
                        onChange={(e) => setNewProduct({ ...newProduct, long_description: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387]"
                        placeholder="Detailed product description"
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Additional Images (Optional)</label>
                      <ImageUpload
                        existingImages={newProduct.images}
                        onImagesChange={(images) => setNewProduct({ ...newProduct, images })}
                      />
                    </div>
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        disabled={addingProduct}
                        className="bg-[#D7B387] text-black px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-colors disabled:opacity-50"
                      >
                        {addingProduct ? 'Adding...' : 'Add Product'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddProductForm(false);
                          setNewProduct({
                            code: '',
                            name: '',
                            category: '',
                            image: '',
                            description: '',
                            long_description: '',
                            images: []
                          });
                          setError('');
                        }}
                        className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Products List */}
              <div className="bg-gray-900 rounded-lg border border-gray-700">
                <div className="p-6 border-b border-gray-700">
                  <h3 className="text-xl font-semibold text-white">Products ({products.length})</h3>
                </div>

                {productsLoading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D7B387] mx-auto mb-4"></div>
                    <p className="text-gray-300">Loading products...</p>
                  </div>
                ) : products.length === 0 ? (
                  <div className="p-8 text-center">
                    <Package className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No products found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Image
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Code
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {products.map((product) => (
                          <tr key={product.id} className={editingProduct === product.id ? "bg-gray-800/50" : "hover:bg-gray-800"}>
                            {editingProduct === product.id ? (
                              <>
                                <td className="px-6 py-6 whitespace-nowrap" colSpan={6}>
                                  <div className="bg-gray-800 rounded-lg p-6 border border-[#D7B387]/30">
                                    <h4 className="text-white font-semibold mb-4 flex items-center">
                                      <Edit2 className="h-4 w-4 mr-2 text-[#D7B387]" />
                                      Edit Product
                                    </h4>
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <label className="block text-xs text-gray-400 mb-2">Product Code</label>
                                          <input
                                            type="text"
                                            value={editProductForm.code}
                                            onChange={(e) => setEditProductForm({ ...editProductForm, code: e.target.value })}
                                            className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387] text-sm"
                                            placeholder="Product code"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-xs text-gray-400 mb-2">Name</label>
                                          <input
                                            type="text"
                                            value={editProductForm.name}
                                            onChange={(e) => setEditProductForm({ ...editProductForm, name: e.target.value })}
                                            className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387] text-sm"
                                            placeholder="Product name"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-xs text-gray-400 mb-2">Category</label>
                                          <input
                                            type="text"
                                            value={editProductForm.category}
                                            onChange={(e) => setEditProductForm({ ...editProductForm, category: e.target.value })}
                                            className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387] text-sm"
                                            placeholder="Category"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-xs text-gray-400 mb-2">Main Image</label>
                                          <SingleImageUpload
                                            currentImage={editProductForm.image}
                                            onImageChange={(imageUrl) => setEditProductForm({ ...editProductForm, image: imageUrl })}
                                            label="Main Image"
                                          />
                                          <input
                                            type="url"
                                            value={editProductForm.image}
                                            onChange={(e) => setEditProductForm({ ...editProductForm, image: e.target.value })}
                                            className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387] text-sm mt-2"
                                            placeholder="Or enter URL: https://..."
                                          />
                                        </div>
                                      </div>
                                      <div>
                                        <label className="block text-xs text-gray-400 mb-2">Short Description</label>
                                        <textarea
                                          value={editProductForm.description}
                                          onChange={(e) => setEditProductForm({ ...editProductForm, description: e.target.value })}
                                          className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387] text-sm"
                                          rows={2}
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs text-gray-400 mb-2">Long Description</label>
                                        <textarea
                                          value={editProductForm.long_description}
                                          onChange={(e) => setEditProductForm({ ...editProductForm, long_description: e.target.value })}
                                          className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387] text-sm"
                                          rows={3}
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs text-gray-400 mb-2">Additional Images</label>
                                        <ImageUpload
                                          existingImages={editProductForm.images}
                                          onImagesChange={(images) => setEditProductForm({ ...editProductForm, images })}
                                        />
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-3 mt-4">
                                      <button
                                        onClick={() => handleUpdateProduct(product.id)}
                                        disabled={updatingProduct}
                                        className="bg-[#D7B387] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#c49f6c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                      >
                                        <Save className="h-4 w-4 mr-2" />
                                        {updatingProduct ? 'Saving...' : 'Save Changes'}
                                      </button>
                                      <button
                                        onClick={handleCancelProductEdit}
                                        className="bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center"
                                      >
                                        <X className="h-4 w-4 mr-2" />
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-16 w-16 object-cover rounded-lg border border-gray-700"
                                  />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="text-[#D7B387] font-mono text-sm">{product.code}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="text-white font-medium">{product.name}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                    {product.category}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="text-gray-300 text-sm line-clamp-2">{product.description}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => handleEditProduct(product)}
                                      className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center text-sm font-medium"
                                      title="Edit product"
                                    >
                                      <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteProduct(product.id, product.name)}
                                      className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg hover:bg-red-500/30 transition-colors flex items-center text-sm font-medium"
                                      title="Delete product"
                                    >
                                      <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <>
              {messagesLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D7B387] mx-auto"></div>
                  <p className="text-gray-400 mt-4">Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No messages yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      All Messages ({messages.length})
                    </h3>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        onClick={() => {
                          setSelectedMessage(message);
                          if (!message.read) {
                            handleMarkAsRead(message.id);
                          }
                        }}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedMessage?.id === message.id
                            ? 'border-[#D7B387] bg-[#D7B387]/10'
                            : message.read
                            ? 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                            : 'border-blue-500/30 bg-blue-500/10 hover:border-blue-500/50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">
                              {message.first_name} {message.last_name}
                              {!message.read && (
                                <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </h4>
                            <p className="text-sm text-gray-400">{message.email}</p>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            {new Date(message.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                            {message.project_type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                          {message.message}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div>
                    {selectedMessage ? (
                      <div className="sticky top-4 p-6 rounded-lg border border-gray-700 bg-gray-800/50">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                              {selectedMessage.first_name} {selectedMessage.last_name}
                            </h3>
                            <p className="text-gray-400 mb-1">
                              <Mail className="inline h-4 w-4 mr-2" />
                              {selectedMessage.email}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <ClockIcon className="h-4 w-4 mr-2" />
                              {new Date(selectedMessage.created_at).toLocaleString()}
                            </p>
                          </div>
                          {selectedMessage.read && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </div>

                        <div className="mb-4">
                          <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                            {selectedMessage.project_type}
                          </span>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-gray-400 mb-2">Message</h4>
                          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                            <p className="text-gray-300 whitespace-pre-wrap">
                              {selectedMessage.message}
                            </p>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <a
                            href={`mailto:${selectedMessage.email}`}
                            className="flex-1 bg-[#D7B387] text-black px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-colors text-center flex items-center justify-center"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Reply via Email
                          </a>
                          <button
                            onClick={() => handleDeleteMessage(selectedMessage.id)}
                            className="bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="sticky top-4 p-12 rounded-lg border border-gray-700 bg-gray-800/50 text-center">
                        <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">Select a message to view details</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;