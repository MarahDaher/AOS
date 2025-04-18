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
    public const DELETE_OFFER = 'delete_offer';
    public const EXPORT_OFFER = 'export_offer';

    // New Offer
    // General Data ( Tab 1 )
    public const VIEW_BASIC_DATA = 'view_basic_data';
    public const CREATE_BASIC_DATA = 'create_basic_data';
    public const UPDATE_BASIC_DATA = 'update_basic_data';

    // Calculation ( Tab 2 )
    public const VIEW_CALCULATION = 'view_calculation';
    public const CREATE_CALCULATION = 'create_calculation';
    public const UPDATE_CALCULATION = 'update_calculation';

    // Prices ( Tab 3 )
    public const VIEW_PRICES = 'view_prices';
    public const CREATE_PRICES = 'create_prices';
    public const UPDATE_PRICES = 'update_prices';


    // Drawing ( Tab 4 )
    public const VIEW_DRAWING = 'view_drawing';
    public const CREATE_DRAWING = 'create_drawing';
    public const UPDATE_DRAWING = 'update_drawing';

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

    // Raw Materials
    public const VIEW_RAW_MATERIALS = 'view_raw_materials';
    public const VIEW_RAW_MATERIAL = 'view_raw_material';
    public const CREATE_RAW_MATERIAL = 'create_raw_material';
    public const UPDATE_RAW_MATERIAL = 'update_raw_material';
    public const DELETE_RAW_MATERIAL = 'delete_raw_material';

    // Offers Raw Materials
    public const VIEW_OFFER_RAW_MATERIALS = 'view_offer_raw_materials';
    public const VIEW_OFFER_RAW_MATERIAL = 'view_offer_raw_material';
    public const CREATE_OFFER_RAW_MATERIAL = 'create_offer_raw_material';
    public const UPDATE_OFFER_RAW_MATERIAL = 'update_offer_raw_material';
    public const DELETE_OFFER_RAW_MATERIAL = 'delete_offer_raw_material';

    //Additives
    public const VIEW_ADDITIVES = 'view_additives';
    public const VIEW_ADDITIVE = 'view_additive';
    public const CREATE_ADDITIVE = 'create_additive';
    public const UPDATE_ADDITIVE = 'update_additive';
    public const DELETE_ADDITIVE = 'delete_additive';

    // Additives Raw Materials
    public const VIEW_ADDITIVE_RAW_MATERIALS = 'view_additive_raw_materials';
    public const VIEW_ADDITIVE_RAW_MATERIAL = 'view_additive_raw_material';
    public const CREATE_ADDITIVE_RAW_MATERIAL = 'create_additive_raw_material';
    public const UPDATE_ADDITIVE_RAW_MATERIAL = 'update_additive_raw_material';
    public const DELETE_ADDITIVE_RAW_MATERIAL = 'delete_additive_raw_material';



    public static function toArray(): array
    {
        return (new ReflectionClass(static::class))->getConstants();
    }
}
