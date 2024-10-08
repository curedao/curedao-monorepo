<?php
/*
*  GNU General Public License v3.0
*  Contributors: ADD YOUR NAME HERE, Mike P. Sinn
 */

namespace App\Properties\Base;
use App\Traits\PropertyTraits\IsFloat;
use App\UI\ImageUrls;
use App\UI\FontAwesome;
use App\Properties\BaseProperty;
class BaseStandardErrorProperty extends BaseProperty{
	use IsFloat;
	public $dbInput = 'float,10,0';
	public $dbType = 'float';
	public $default = \OpenApi\Generator::UNDEFINED;
	public $description = 'Measure of variability of the
mean value as a function of the number of data points.';
	public $example = 0.074;
	public $fieldType = 'float';
	public $fontAwesome = FontAwesome::ERROR;
	public $htmlType = 'text';
	public $image = ImageUrls::ERROR_MESSAGE;
	public $importance = false;
	public $inForm = true;
	public $inIndex = true;
	public $inView = true;
	public $isFillable = true;
	public $isOrderable = true;
	public $isSearchable = false;
	public $name = self::NAME;
	public const NAME = 'standard_error';
	public $canBeChangedToNull = true;
	public $phpType = 'float';
	public $rules = 'nullable|numeric';
	public $title = 'Standard Error';
	public $type = self::TYPE_NUMBER;
	public $validations = 'nullable|numeric';

}
