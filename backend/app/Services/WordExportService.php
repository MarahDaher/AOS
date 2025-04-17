<?php

namespace App\Services;

use PhpOffice\PhpWord\TemplateProcessor;

class WordExportService
{

    public function exportOfferWithTemplate(array $data, string $outputFilename)
    {
        $templatePath = storage_path('app/templates/Angebot Vorlage AOS.docx');

        $template = new TemplateProcessor($templatePath);

        // 🔄 Replace placeholders in the DOCX with dynamic data
        $template->setValue('company_name', $data['company_name'] ?? 'Marah');
        $template->setValue('color', $data['color'] ?? '');
        $template->setValue('profile_name', $data['profile_name'] ?? 'Daher');
        // $template->setValue('price_per_meter', $data['price_per_meter'] ?? '1,47');
        // $template->setValue('delivery_time', $data['delivery_time'] ?? 'ca. 15 AT');
        // $template->setValue('manager_name', $data['manager_name'] ?? 'Michael Diebner');
        // 🔁 Add as many placeholders as you defined in the Word file like ${...}

        $outputPath = storage_path("app/public/{$outputFilename}.docx");
        $template->saveAs($outputPath);

        return response()->download($outputPath)->deleteFileAfterSend();
    }
}
