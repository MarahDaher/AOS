<?php

return [

    // Status names (stable keys)
    'statuses' => [
        'VORKALKULATION' => 'Vorkalkulation',
        'ANGEBOT' => 'Angebot',
        'AUFTRAG' => 'Auftrag',
        'PRODUZIERT' => 'Produziert',
        'VERSANDT' => 'Versandt',
        'GELOESCHT' => 'Gelöscht',
    ],

    // Editable fields rules by role + status
    'editable_fields' => [
        'admin' => 'ALL', // admin can edit everything

        'sales' => [
            'VORKALKULATION' => 'ALL',
            'ANGEBOT' => ['general_status_id', 'general_order_number'],
            'AUFTRAG' => ['general_status_id'],
            'PRODUZIERT' => ['general_status_id'],
            'VERSANDT' => [],
        ],

        'production' => [
            'VERSANDT' => [], // cannot edit anything
            'DEFAULT' => [
                'runningcard_extrusion_speed_IST',
                'runningcard_profile_weight_IST',
                'runningcard_sampling_date',
                'runningcard_sampling_quantity',
                'runningcard_sampling_length',
                'runningcard_sampling_packing',
                'runningcard_sampling_indication',
                'runningcard_qualitity_indication',
                'runningcard_printing',
                'runningcard_packing_type',
                'runningcard_packing_variant',
                'runningcard_packing_length',
                'runningcard_packing_packing_unit',
                'runningcard_packing_quantity',
                'runningcard_packing_description',
                'runningcard_hourlyrecording_construction',
                'runningcard_hourlyrecording_toolwork',
                'runningcard_hourlyrecording_entry',
                'runningcard_hourlyrecording_entrystitches',
                'runningcard_hourlyrecording_entrydriver_user_id',
                'runningcard_hourlyrecording_toolmaker_user_id',
                'runningcard_tool_costs',
                'runningcard_tool_hint'
            ],
        ],
    ],

];
