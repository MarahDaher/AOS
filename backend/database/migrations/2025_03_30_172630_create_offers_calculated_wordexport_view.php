<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateOffersCalculatedWordExportView extends Migration
{
  public function up(): void
  {
    DB::statement(
      <<<SQL
      CREATE OR REPLACE VIEW offers_calculated_wordexport AS 
  SELECT 
    oc.*,

    (
      SELECT GROUP_CONCAT(ocr.name , " (" , ROUND(ocr.share) , "%" , COALESCE(CONCAT(", Additive: ",ocr._additives_concatenated),"") , ")" SEPARATOR ", ") 
      FROM `offers_calculated_temp3` oc2 JOIN `offers_raw_materials_calculated` ocr ON (oc2.id=ocr.offer_id) 
      WHERE oc2.id=oc.id 
    ) AS _ingredients_concatenated

  FROM offers_calculated oc
  SQL
    );
  }

  public function down(): void
  {
    DB::statement('DROP VIEW IF EXISTS offers_calculated_wordexport');
  }
}
