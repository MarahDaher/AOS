<?php

namespace App\Config;

class RoleConstants
{
    const ADMIN_ROLE = 'admin';

    const SALES_ROLE = 'sales';
    
    const PRODUCTION_ROLE = 'production';


    const ROLES = [
        [
            'name' => RoleConstants::ADMIN_ROLE,
            'guard_name' => 'api'
        ],
        [
            'name' => RoleConstants::SALES_ROLE,
            'guard_name' => 'api'
        ],
        [
            'name' => RoleConstants::PRODUCTION_ROLE,
            'guard_name' => 'api'
        ],
    ];
}
