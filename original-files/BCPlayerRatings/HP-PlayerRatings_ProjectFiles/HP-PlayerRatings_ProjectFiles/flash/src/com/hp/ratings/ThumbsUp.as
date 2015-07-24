package com.hp.ratings
{
	import flash.display.Bitmap;
	import flash.display.DisplayObject;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.events.MouseEvent;

	public class ThumbsUp extends Sprite
	{
		private var _button:Sprite = new Sprite();
		
		[Embed (source="/thumbs-up-off.png" )]
		public static const THUMBS_UP_OFF:Class;
		
		[Embed (source="/thumbs-up-on.png" )]
		public static const THUMBS_UP_ON:Class;
		
		[Embed (source="/thumbs-up-hover.png" )]
		public static const THUMBS_UP_HOVER:Class;
		
		public function ThumbsUp()
		{
			addDisplayItems();
			//setUpEventListeners();
		}
		
		private function addDisplayItems():void
		{
			_button.name = 'button';
			_button.buttonMode = true;
			
			// create icons and add to button
			var thumbsUpOff:Bitmap = new THUMBS_UP_OFF();
			thumbsUpOff.name = 'thumbsUpOff';
			thumbsUpOff.alpha = 1;
			thumbsUpOff.width = 51;
			thumbsUpOff.height = 36;
			
			var thumbsUpHover:Bitmap = new THUMBS_UP_HOVER();
			thumbsUpHover.name = 'thumbsUpHover';
			thumbsUpHover.alpha = 0;
			thumbsUpHover.width = 51;
			thumbsUpHover.height = 36;
			
			var thumbsUpOn:Bitmap = new THUMBS_UP_ON();
			thumbsUpOn.name = 'thumbsUpOn';
			thumbsUpOn.alpha = 0;
			thumbsUpOn.width = 51;
			thumbsUpOn.height = 36;
			
			// add bitmap images too button in order they would appear
			_button.addChild(thumbsUpOff);
			_button.addChild(thumbsUpHover);
			_button.addChild(thumbsUpOn);
			
			addChild(_button);
		}
		
		private function setUpEventListeners():void
		{
			_button.addEventListener(MouseEvent.MOUSE_OVER, onIconHover);
			_button.addEventListener(MouseEvent.MOUSE_OUT, onIconOut);
		}
		
		private function onIconHover(evt:MouseEvent):void
		{
			var hoverIcon:Bitmap = _button.getChildByName('thumbsUpHover') as Bitmap;
			hoverIcon.alpha = 1;
		}
		
		private function onIconOut(evt:MouseEvent):void
		{
			var hoverIcon:Bitmap = _button.getChildByName('thumbsUpHover') as Bitmap;
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
		
		public function highlightThumbsUp():void
		{
			var onState:Bitmap = _button.getChildByName('thumbsUpOn') as Bitmap;
			onState.alpha = 1;
			
			if( _button.getChildByName('thumbsUpHover') )
			{
				var hoverState:Bitmap = _button.getChildByName('thumbsUpHover') as Bitmap;
				hoverState.alpha = 0;
			}
		}
		
		public function resetButton():void
		{
			if( _button.getChildByName('thumbsUpOn') )
			{
				var onState:Bitmap = _button.getChildByName('thumbsUpOn') as Bitmap;
				onState.alpha = 0;
			}
		}
	}
}