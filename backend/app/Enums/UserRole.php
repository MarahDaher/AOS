<?php

namespace App\Enums;

enum UserRole: int
{
    case Admin = 1;
    case Sales = 2;
    case Production = 3;
}
