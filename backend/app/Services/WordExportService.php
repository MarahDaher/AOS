<?php

namespace App\Services;

use PhpOffice\PhpWord\TemplateProcessor;

class WordExportService
{

    public function exportOfferWithTemplate(array $data, string $outputFilename)
    {
        $templatePath = storage_path(config('offer_word_export.template_path'));
        $template = new TemplateProcessor($templatePath);

        $placeholders = config('offer_word_export.placeholders');

        foreach ($placeholders as $templatePlaceholder => $dataField) {
            $template->setValue($templatePlaceholder, $data[$dataField] ?? '-');
        }

        // Add the TODAY() field separately
        $template->setValue('TODAY()', now()->format('d.m.Y'));

        $outputPath = storage_path("app/public/{$outputFilename}.docx");
        $template->saveAs($outputPath);

        return response()->download($outputPath)->deleteFileAfterSend();
    }
}
