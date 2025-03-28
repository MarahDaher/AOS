<?php

namespace App\Config;

use ReflectionClass;

class PermissionConstants
{
    // Offers Page
    public const VIEW_OFFERS = 'view_offers';
    public const VIEW_OFFER = 'view_offer';
    public const CREATE_OFFER = 'create_offer';
    public const UPDATE_OFFER = 'update_offer';
    public const DUPLICAET_OFFER = 'duplicate_offer';

    // New Offer
    // General Data ( Tab 1 )
    public const VIEW_GERNERAL_DATA = 'view_gerneral_data';
    public const CREATE_GERNERAL_DATA = 'create_gerneral_data';
    public const UPATE_GERNERAL_DATA = 'update_gerneral_data';

    // Calculation ( Tab 2 )
    public const VIEW_CALCULATION = 'view_calculation';
    public const CREATE_CALCULATION = 'create_calculation';
    public const UPDATE_CALCULATION = 'update_calculation';

    // Prices ( Tab 3 )
    public const VIEW_PRICES = 'view_prices';
    public const CREATE_PRICES = 'create_prices';
    public const UPDATE_PRICES = 'update_prices';


    // Drawering ( Tab 4 )
    public const VIEW_DRAWERING = 'view_drawering';
    public const CREATE_DRAWERING = 'create_drawering';
    public const UPDATE_DRAWERING = 'update_drawering';

    // Process Sheet ( Tab 5 )
    public const VIEW_PROCESS_SHEET = 'view_process_sheet';
    public const CREATE_PROCESS_SHEET = 'create_process_sheet';
    public const UPDATE_PROCESS_SHEET = 'update_process_sheet';

    // Users Page
    public const VIEW_USERS = 'view_users';
    public const VIEW_USER = 'view_user';
    public const CREATE_USER = 'create_user';
    public const UPDATE_USER = 'update_user';
    public const DELETE_USER = 'delete_user';
    public const CHANGE_USER_PASSWORD = 'change_user_password';

    // Roles
    public const VIEW_ROLES = 'view_roles';
    public const VIEW_ROLE = 'view_role';
    public const CREATE_ROLE = 'create_role';
    public const UPDATE_ROLE = 'update_role';
    public const DELETE_ROLE = 'delete_role';

    // Permissions
    public const VIEW_PERMISSIONS = 'view_permissions';
    public const VIEW_PERMISSION = 'view_permission';
    public const CREATE_PERMISSION = 'create_permission';
    public const UPDATE_PERMISSION = 'update_permission';
    public const DELETE_PERMISSION = 'delete_permission';


    public static function toArray(): array
    {
        return (new ReflectionClass(static::class))->getConstants();
    }
}
