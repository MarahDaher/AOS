<?php
$zip = new ZipArchive;
if ($zip->open('vendor.zip') === TRUE) {
    $zip->extractTo('./'); // فك الضغط في نفس المجلد
    $zip->close();
    echo '✅ Unzipped successfully.';
} else {
    echo '❌ Failed to unzip.';
}
