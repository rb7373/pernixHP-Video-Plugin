package com.hp.ratings
{
	import flash.display.Bitmap;
	import flash.display.DisplayObject;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	
	public class ThumbsDown extends Sprite
	{
		private var _button:Sprite = new Sprite();
		
		[Embed (source="/thumbs-down-off.png" )]
		public static const THUMBS_DOWN_OFF:Class;
		
		[Embed (source="/thumbs-down-on.png" )]
		public static const THUMBS_DOWN_ON:Class;
		
		[Embed (source="/thumbs-down-hover.png" )]
		public static const THUMBS_DOWN_HOVER:Class;
		
		public function ThumbsDown()
		{
			addDisplayItems();
			//setUpEventListeners();
		}
		
		private function addDisplayItems():void
		{
			_button.name = 'button';
			_button.buttonMode = true;
			
			// create icons and add to button
			var thumbsDownOff:Bitmap = new THUMBS_DOWN_OFF();
			thumbsDownOff.name = 'thumbsDownOff';
			thumbsDownOff.alpha = 1;
			thumbsDownOff.width = 51;
			thumbsDownOff.height = 36;
			
			var thumbsDownHover:Bitmap = new THUMBS_DOWN_HOVER();
			thumbsDownHover.name = 'thumbsDownHover';
			thumbsDownHover.alpha = 0;
			thumbsDownHover.width = 51;
			thumbsDownHover.height = 36;
			
			var thumbsDownOn:Bitmap = new THUMBS_DOWN_ON();
			thumbsDownOn.name = 'thumbsDownOn';
			thumbsDownOn.alpha = 0;
			thumbsDownOn.width = 51;
			thumbsDownOn.height = 36;
			
			// add bitmap images too button in order they would appear
			_button.addChild(thumbsDownOff);
			_button.addChild(thumbsDownHover);
			_button.addChild(thumbsDownOn);
			
			addChild(_button);
		}
		
		private function setUpEventListeners():void
		{
			_button.addEventListener(MouseEvent.MOUSE_OVER, onIconHover);
			_button.addEventListener(MouseEvent.MOUSE_OUT, onIconOut);
		}
		
		private function onIconHover(evt:MouseEvent):void
		{
			var hoverIcon:Bitmap = _button.getChildByName('thumbsDownHover') as Bitmap;
			hoverIcon.alpha = 1;
		}
		
		private function onIconOut(evt:MouseEvent):void
		{
			var hoverIcon:Bitmap = _button.getChildByName('thumbsDownHover') as Bitmap;
			hoverIcon.alpha = 0;
		}
		
		public function disableButton():void
		{
			// remove event listeners
			_button.removeEventListener(MouseEvent.MOUSE_OVER, onIconHover);
			_button.removeEventListener(MouseEvent.MOUSE_OUT, onIconOut);
			
			_button.buttonMode = false;
		}
		
		public function enableButton():void
		{
			// re-add event listeners and set buttonMode to true
			_button.addEventListener(MouseEvent.MOUSE_OVER, onIconHover);
			_button.addEventListener(MouseEvent.MOUSE_OUT, onIconOut);
			
			_button.buttonMode = true;
		}
		
		public function highlightThumbsDown():void
		{
			var onState:Bitmap = _button.getChildByName('thumbsDownOn') as Bitmap;
			onState.alpha = 1;
			
			if( _button.getChildByName('thumbsDownHover') )
			{
				var hoverState:Bitmap = _button.getChildByName('thumbsDownHover') as Bitmap;
				hoverState.alpha = 0;
			}
		}
		
		public function resetButton():void
		{
			if( _button.getChildByName('thumbsDownOn') )
			{
				var onState:Bitmap = _button.getChildByName('thumbsDownOn') as Bitmap;
				onState.alpha = 0;
			}
		}
	}
}