<?php

declare(strict_types=1);

namespace App\DataSources\Connectors\Fitbit\Body\Goals;

use App\DataSources\Connectors\Fitbit\BasicEnum;

class GoalType extends BasicEnum
{
    public const WEIGHT = 'weight';
    public const FAT = 'fat';

    private $type;

    public function __construct(string $type)
    {
        parent::checkValidity($type);
        $this->type = $type;
    }

    public function __toString()
    {
        return $this->type;
    }
}
