/**
 * Handles role-based authorization checks
 */
export function isAuthorized(role: { permissions?: { [key: string]: string[] } } = {}, requiredPermissions: { [key: string]: string }): boolean {
  // Check if role exists and has permissions object
  if (!role || typeof role.permissions !== 'object' || role.permissions === null) {
    return false;
  }
  
  // Get required permission key (e.g., 'analytics:read')
  const [permissionArea, permissionLevel] = Object.keys(requiredPermissions)[0].split(':');
  
  // Check if role has the required permission
  return role.permissions[permissionArea]?.includes(permissionLevel) || false;
}