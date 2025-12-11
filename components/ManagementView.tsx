import React, { useState } from 'react';
import { 
  Users, Shield, Settings, Plus, MoreHorizontal, Edit3, Trash2, Check, Lock, Search 
} from 'lucide-react';
import { MOCK_MANAGED_USERS, MOCK_ROLES, ALL_PERMISSIONS } from '../constants';
import { Role, ManagedUser } from '../types';
import { TechSwitch, Badge } from './UIComponents';

const UserManagementTab = ({ tenantName }: { tenantName: string }) => {
  const [users, setUsers] = useState(MOCK_MANAGED_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input 
             className="w-64 bg-[#0F1623] border border-eureka-border rounded-lg py-2 pl-9 pr-3 text-xs text-white outline-none focus:border-eureka-primary"
             placeholder="Search users..."
             value={searchTerm}
             onChange={e => setSearchTerm(e.target.value)}
          />
          <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
        </div>
        <button className="px-4 py-2 bg-eureka-primary hover:bg-eureka-primary/90 text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-all">
           <Plus size={14} /> Add User
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#151B2B] border border-eureka-border rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#0B0F19] border-b border-eureka-border text-[10px] uppercase tracking-wider text-slate-500 font-bold">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Login</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredUsers.map(user => {
               const roleName = MOCK_ROLES.find(r => r.id === user.roleId)?.name || user.roleId;
               return (
                <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white border border-slate-500">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
                      {roleName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${user.status === 'active' ? 'text-emerald-400' : 'text-slate-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400 font-mono">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white" title="Edit"><Edit3 size={14} /></button>
                      <button className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-red-400" title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
               );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RoleManagementTab = () => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(MOCK_ROLES[0].id);
  const [roles, setRoles] = useState(MOCK_ROLES);

  const activeRole = roles.find(r => r.id === selectedRoleId) || roles[0];

  const togglePermission = (permId: string) => {
    setRoles(prev => prev.map(r => {
      if (r.id === selectedRoleId) {
        const hasPerm = r.permissions.includes(permId);
        return {
          ...r,
          permissions: hasPerm ? r.permissions.filter(p => p !== permId) : [...r.permissions, permId]
        };
      }
      return r;
    }));
  };

  const categories = Array.from(new Set(ALL_PERMISSIONS.map(p => p.category)));

  return (
    <div className="flex h-full gap-6">
      {/* Left: Role List */}
      <div className="w-64 flex flex-col gap-3">
        {roles.map(role => (
          <button
            key={role.id}
            onClick={() => setSelectedRoleId(role.id)}
            className={`text-left p-4 rounded-xl border transition-all ${
              selectedRoleId === role.id 
                ? 'bg-eureka-primary border-eureka-primary text-white shadow-lg' 
                : 'bg-[#151B2B] border-eureka-border text-slate-400 hover:border-slate-500 hover:text-slate-200'
            }`}
          >
            <div className="font-bold text-sm mb-1 flex items-center justify-between">
              {role.name}
              {selectedRoleId === role.id && <Check size={14} />}
            </div>
            <div className={`text-xs ${selectedRoleId === role.id ? 'text-indigo-200' : 'text-slate-500'}`}>
              {role.description}
            </div>
          </button>
        ))}
        <button className="mt-2 py-3 border border-dashed border-slate-600 text-slate-500 rounded-xl hover:border-slate-400 hover:text-slate-300 text-xs font-bold flex items-center justify-center gap-2 transition-all">
           <Plus size={14} /> Create New Role
        </button>
      </div>

      {/* Right: Permissions Matrix */}
      <div className="flex-1 bg-[#151B2B] border border-eureka-border rounded-xl p-8 overflow-y-auto custom-scrollbar">
         <div className="mb-8 border-b border-white/5 pb-6">
            <h3 className="text-xl font-bold text-white mb-2">{activeRole.name} Permissions</h3>
            <p className="text-sm text-slate-400">Configure access levels for this role across the Eureka platform.</p>
         </div>
         
         <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            {categories.map(cat => (
              <div key={cat}>
                <h4 className="text-xs font-bold text-eureka-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-eureka-primary"></span> {cat}
                </h4>
                <div className="space-y-3">
                  {ALL_PERMISSIONS.filter(p => p.category === cat).map(perm => (
                    <TechSwitch 
                      key={perm.id}
                      label={perm.label}
                      checked={activeRole.permissions.includes(perm.id)}
                      onChange={() => togglePermission(perm.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export const ManagementView = ({ tenant }: { tenant: string }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');

  return (
    <div className="flex flex-col h-full bg-eureka-dark p-8 overflow-hidden">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-light text-white mb-1 flex items-center gap-3">
             <Settings className="text-eureka-accent" /> System Configuration
          </h2>
          <p className="text-xs text-slate-500">Manage access and security for <span className="text-white font-bold">{tenant}</span>.</p>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex bg-[#0F1623] border border-eureka-border rounded-lg p-1">
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${activeTab === 'users' ? 'bg-eureka-panel text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Users size={14} /> User Management
          </button>
          <button 
            onClick={() => setActiveTab('roles')}
            className={`px-6 py-2 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${activeTab === 'roles' ? 'bg-eureka-panel text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Shield size={14} /> Roles & Permissions
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {activeTab === 'users' ? <UserManagementTab tenantName={tenant} /> : <RoleManagementTab />}
      </div>
    </div>
  );
};