<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use PhpOffice\PhpWord\TemplateProcessor;

class WordExportService
{

    public function exportOfferWithTemplate(array $placeholders, string $outputFilename)
    {
        $templatePath = storage_path(config('offer_word_export.template_path'));
        $template = new TemplateProcessor($templatePath);

        // Optional: get template variables (but no logging anymore)
        $templateVariables = $template->getVariables();

        foreach ($placeholders as $templatePlaceholder => $value) {
            if (in_array($templatePlaceholder, $templateVariables)) {
                $template->setValue($templatePlaceholder, $value ?? '-');
            }
        }

        $template->setValue('TODAY()', now()->format('d.m.Y'));

        $outputPath = storage_path("app/public/{$outputFilename}.docx");
        $template->saveAs($outputPath);

        return response()->download($outputPath)->deleteFileAfterSend();
    }
}
