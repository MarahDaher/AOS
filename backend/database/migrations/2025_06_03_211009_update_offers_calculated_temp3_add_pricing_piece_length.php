<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement(<<<SQL
  CREATE OR REPLACE VIEW offers_calculated_temp3 AS
  SELECT 
    o.*
  FROM offers o;
SQL);
    }

    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS offers_calculated_temp3");
    }
};
