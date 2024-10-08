<?php
namespace Tests\UnitTests\Widgets;
use App\Models\User;
use App\Slim\View\Request\QMRequest;
use App\Widgets\CompletedAnalysesChartWidget;
use Tests\UnitTestCase;

class WidgetTest extends UnitTestCase
{
	protected function setUp(): void{
		$this->skipIfNotLocal("Unreproduceable locally");
		parent::setUp(); // TODO: Change the autogenerated stub
	}
	public function testWidgetLoader(){
        QMRequest::setParam('table', User::TABLE);
        $config = CompletedAnalysesChartWidget::getWidgetParams(User::TABLE);
        $widget = new CompletedAnalysesChartWidget($config);
        $this->assertEquals(User::TABLE, $widget->table);
        $text = $widget->getLoadingText();
        $this->assertEquals("Generating Users That Have Been Analyzed chart...", $text);
    }
}
