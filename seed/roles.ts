const data = [
  { action: 'read', subject: 'User' },
  {
    action: 'manage',
    subject: 'User',
    conditions: { authorId: '${user.id}' },
  },
  {
    action: 'update',
    subject: 'User',
  },
];

export const roles = [{ name: 'admin' }, { name: 'user', permissions: data }];
