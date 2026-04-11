import Role from '../db/models/role.model';
import BaseRepository from './base.repository';

class RoleRepository extends BaseRepository<Role> {
    constructor() {
        super(Role);
    }
}

export default RoleRepository;