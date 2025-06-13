<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        DB::statement(<<<SQL
        CREATE OR REPLACE VIEW offers_calculated_temp AS 
        SELECT 
            o.*
            -- o.pricing_piece_length_prices_length1,
            -- o.pricing_piece_length_prices_length2,
            -- o.pricing_piece_length_prices_length3,
            -- o.pricing_piece_length_prices_length4,
            -- o.pricing_piece_length_prices_length5
        FROM offers o;
        SQL);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        DB::statement("DROP VIEW IF EXISTS offers_calculated_temp");
    }
};
