package com.hp.ratings
{
	import com.adobe.serialization.json.*;
	import com.brightcove.api.events.MediaEvent;
	import com.brightcove.api.modules.ExperienceModule;
	import com.brightcove.api.modules.VideoPlayerModule;
	
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.net.FileReference;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.text.AntiAliasType;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	import flash.text.TextFormat;
	import flash.text.TextFormatAlign;
	
	public class VideoViews extends Sprite
	{
		
		//		TODO: remove or check to module to constants file
		private var SUMMIT_EVENT_VIEW:String = 'userVideoView';
		private var PROJECT_ID:String = '550b409859949a13d1afbe31';
		private var WRITE_KEY:String = '97d46eeb80dea57583e9a01f21342635a6157b6caac3dcb65f905d1c4671c1570290e4625ed54f695884a15edbca6f70bb53333b8f55e586c75dc99141a7dbc103fc7984ded87494f36cc6826c0a750f3c62a9f4fd93bfad88b7d6ab27d910704d02b645614c889f9ad496a75cacc897';
		
		private var _apiToken:String;
		private var _playsTotal:String = "";
		private var _totalViews:TextField = new TextField();
		private var _viewsText:TextField = new TextField();
		private var _textFormat:TextFormat = new TextFormat();
		
		private var _experienceModule:ExperienceModule;
		private var _videoPlayerModule:VideoPlayerModule;
		
		private var _ratingsWidth:Number;
		
		/** Embedded font configuration. */
		[Embed(source="/font/HPSimplifiedW10-Regular.ttf" , fontName="HPS_Regular", mimeType="application/x-font-truetype",embedAsCFF="false")]
		public var embedded_font:String;
		
		public function VideoViews(experienceModule:ExperienceModule, videoPlayerModule:VideoPlayerModule, apiToken:String, ratingsWidth:Number)
		{
			_experienceModule = experienceModule;
			_videoPlayerModule = videoPlayerModule;
			_apiToken = apiToken;
			_ratingsWidth = ratingsWidth;
			
			retrievePlaysTotal();
			addDisplayItems();
			setUpEventListeners();
		}
		
		private function setUpEventListeners():void
		{
			_videoPlayerModule.addEventListener(MediaEvent.CHANGE, onMediaChange);
		}
		
		private function onMediaChange(evt:MediaEvent):void
		{
			retrievePlaysTotal();
		}
		
		private function retrievePlaysTotal():void
		{	
			//Media API test
			var videoID:Number = _videoPlayerModule.getCurrentVideo().id;
			var loader:URLLoader;
			//			TODO: remove
			//			var url:String = "http://api.brightcove.com/services/library?command=find_video_by_id" +
			//				"&video_fields=playsTotal&video_id=" + videoID + "&token=" + _apiToken;
			
			// In order to test:
			// var url:String = https://api.keen.io/3.0/projects/550b409859949a13d1afbe31/queries/count?api_key=97d46eeb80dea57583e9a01f21342635a6157b6caac3dcb65f905d1c4671c1570290e4625ed54f695884a15edbca6f70bb53333b8f55e586c75dc99141a7dbc103fc7984ded87494f36cc6826c0a750f3c62a9f4fd93bfad88b7d6ab27d910704d02b645614c889f9ad496a75cacc897&event_collection=userVideoView&timezone=UTC&filters=%5B%7B%22property_name%22%3A%22videoID%22%2C%22operator%22%3A%22eq%22%2C%22property_value%22%3A%22keeid-4330525144001%22%7D%5D
			
			// Expected response
			// {"result": 5}
			
			var url:String = "https://api.keen.io/3.0/projects/" + PROJECT_ID +
				"/queries/count?api_key=" + WRITE_KEY +
				"&event_collection="+ SUMMIT_EVENT_VIEW +
				"&timezone=UTC&filters=%5B%7B%22property_name%22%3A%22videoID%22%2C%22operator%22%3A%22eq%22%2C%22property_value%22%3A%22"+ videoID
				+"%22%7D%5D";
			
			var request:URLRequest = new URLRequest(url);
			
			loader = new URLLoader();
			loader.addEventListener(Event.COMPLETE, loaderCompleteHandler);
			
			try {
				loader.load(request);
			}
			catch (error:SecurityError)
			{
				trace("A SecurityError has occurred.");
			}
		}
		
		private function loaderCompleteHandler(evt:Event):void
		{
			var raw:String = evt.currentTarget.data;
			var videoObject:Object = com.adobe.serialization.json.JSON.decode(evt.currentTarget.data) as Object;
			
			var totalPlays:Number = videoObject.result;
			
			//			TODO: remove
			//			var totalPlays:Number = videoObject.playsTotal;
			
			_playsTotal = totalPlays.toString().replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
			
			if (_playsTotal == "1")
			{
				_viewsText.embedFonts = true;
				_viewsText.text = 'view DEMO Pernix';
				_viewsText.setTextFormat(_textFormat);
				_viewsText.x = _ratingsWidth;
				_viewsText.antiAliasType = AntiAliasType.ADVANCED;
				_viewsText.autoSize = TextFieldAutoSize.RIGHT;
			}else{
				_viewsText.embedFonts = true;
				_viewsText.text = 'views DEMO Pernix';
				_viewsText.setTextFormat(_textFormat);
				_viewsText.x = _ratingsWidth;
				_viewsText.antiAliasType = AntiAliasType.ADVANCED;
				_viewsText.autoSize = TextFieldAutoSize.RIGHT;
			}
			
			// adjust text
			_totalViews.embedFonts = true;
			_totalViews.text = _playsTotal;
			_totalViews.setTextFormat(_textFormat);
			_totalViews.x = _viewsText.x - _totalViews.width - 1;
			_totalViews.antiAliasType = AntiAliasType.ADVANCED;
			_totalViews.autoSize = TextFieldAutoSize.RIGHT;
		}
		
		private function addDisplayItems():void
		{
			var layoutWidth:Number = _experienceModule.getWidth();
			
			//----------- text format
			_textFormat.color = 0x000000;
			_textFormat.bold = true;
			_textFormat.size = 17;
			_textFormat.font = 'HPS_Regular';
			//-----------
			
			var box:Sprite = new Sprite();
			box.name = 'box';
			
			_totalViews.name = 'totalViews';
			_totalViews.x = _ratingsWidth;
			_totalViews.y = 5;
			_totalViews.antiAliasType = AntiAliasType.ADVANCED;
			_totalViews.autoSize = TextFieldAutoSize.RIGHT;
			
			_viewsText.embedFonts = true;
			_viewsText.name = "viewsText";
			_viewsText.text = 'views DEMO Pernix';
			_viewsText.setTextFormat(_textFormat);
			_viewsText.y = box.y + 5;
			_viewsText.antiAliasType = AntiAliasType.ADVANCED;
			_viewsText.autoSize = TextFieldAutoSize.RIGHT;
			
			box.addChild(_totalViews);
			box.addChild(_viewsText);
			addChild(box);
		}
		
		private static function formatNumber(number:Number):String
		{
			var numString:String = number.toString();
			var result:String = '';
			
			while (numString.length > 3)
			{
				var chunk:String = numString.substr(-3);
				numString = numString.substr(0, numString.length - 3);
				result = ',' + chunk + result;
			}
			
			if (numString.length > 0)
			{
				result = numString + result;
			}
			
			return result;
		}
	}
}