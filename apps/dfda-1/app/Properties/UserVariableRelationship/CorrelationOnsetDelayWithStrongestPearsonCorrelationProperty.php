<?php
/*
*  GNU General Public License v3.0
*  Contributors: ADD YOUR NAME HERE, Mike P. Sinn
 */

namespace App\Properties\UserVariableRelationship;
use App\Models\UserVariableRelationship;
use App\Traits\PropertyTraits\CorrelationProperty;
use App\Properties\Base\BaseOnsetDelayWithStrongestPearsonCorrelationProperty;
use App\Traits\PropertyTraits\IsCalculated;
use App\VariableRelationships\QMUserVariableRelationship;
class CorrelationOnsetDelayWithStrongestPearsonCorrelationProperty extends BaseOnsetDelayWithStrongestPearsonCorrelationProperty
{
    use CorrelationProperty;
    use IsCalculated;
    public $table = UserVariableRelationship::TABLE;
    public $parentClass = UserVariableRelationship::class;
    /**
     * @param QMUserVariableRelationship $model
     * @return float
     * @throws \App\Exceptions\NotEnoughDataException
     * @throws \App\Exceptions\TooSlowToAnalyzeException
     */
    public static function calculate($model): float{
        $correlations = $model->getOverDelays();
        $strongest = 0;
        $delay = null;
        foreach($correlations as $i => $c){
            if(abs($c->correlationCoefficient) > abs($strongest)){
                $strongest = $c->correlationCoefficient;
                $delay = $c->onsetDelay;
            }
        }
        $model->setAttribute(static::NAME, $delay);
        return $delay;
    }
}
