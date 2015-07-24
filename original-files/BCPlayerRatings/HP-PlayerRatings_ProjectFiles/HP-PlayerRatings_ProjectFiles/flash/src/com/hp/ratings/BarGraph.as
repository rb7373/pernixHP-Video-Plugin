package com.hp.ratings
{
	import com.adobe.serialization.json.*;
	import com.brightcove.api.events.MediaEvent;
	import com.brightcove.api.modules.ExperienceModule;
	import com.brightcove.api.modules.VideoPlayerModule;
	
	import flash.display.LoaderInfo;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.net.URLRequestMethod;
	import flash.text.AntiAliasType;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	import flash.text.TextFormat;
	import flash.text.TextFormatAlign;
	
	public class BarGraph extends Sprite
	{
		private var _experienceModule:ExperienceModule;
		private var _videoPlayerModule:VideoPlayerModule;
		private var _url:String;
		private var _bvVideoID:String;
		
		private var _totalLikes:TextField = new TextField();
		private var _totalDislikes:TextField = new TextField();
		private var _likesTxt:TextField = new TextField();
		private var _dislikesTxt:TextField = new TextField();
		
		private var _textFormat:TextFormat = new TextFormat();
		private var _textFormat2:TextFormat = new TextFormat();
		
		private var _likesPercent:Number;
		private var _likesBar:Sprite = new Sprite();
		
		/** Embedded font configuration. */
		[Embed(source="/font/HPSimplifiedW10-Regular.ttf" , fontName="HPS_Regular", mimeType="application/x-font-truetype",embedAsCFF="false")]
		public var embedded_font:String;
		
		public function BarGraph(url:String, experienceModule:ExperienceModule, videoPlayerModule:VideoPlayerModule, bvVideoID:String)
		{
			_experienceModule = experienceModule;
			_videoPlayerModule = videoPlayerModule;
			_url = url;
			_bvVideoID = bvVideoID.replace("-","");

			addDisplayItems();
			getCurrentRatings();
			setUpEventListeners();
		}
		
		private function setUpEventListeners():void
		{
			_videoPlayerModule.addEventListener(MediaEvent.CHANGE, onMediaChange);
		}
		
		private function onMediaChange(evt:MediaEvent):void
		{
			getCurrentRatings();
		}
		
		private function addDisplayItems():void
		{
			//----------- text formats
			_textFormat.color = 0x000000;
			_textFormat.bold = true;
			_textFormat.size = 18;
			_textFormat.font = 'HPS_Regular';
			
			_textFormat2.color = 0x5a5a5a;
			_textFormat2.bold = true;
			_textFormat2.size = 14;
			_textFormat2.font = 'HPS_Regular';
			//-----------
			
			var graph:Sprite = new Sprite();
			graph.name = 'graph';
			
			var graphBGRect:Sprite = new Sprite();
			graphBGRect.graphics.beginFill(0xB9B8BB,1);
			graphBGRect.graphics.drawRect(0,0,178,8);
			graphBGRect.graphics.endFill();
			
			_likesBar.graphics.beginFill(0x0096D6,1);
			_likesBar.graphics.drawRect(0,0,1,8);
			_likesBar.graphics.endFill();
			
			_totalLikes.embedFonts = true;
			_totalLikes.name = 'totalLikes';
			_totalLikes.x = -3;
			_totalLikes.y = 8;
			_totalLikes.height = 16;
			_totalLikes.autoSize = TextFieldAutoSize.LEFT;
			
			_likesTxt.embedFonts = true;
			_likesTxt.name = 'likesTxt';
			_likesTxt.setTextFormat(_textFormat2);
			_likesTxt.x = _totalLikes.x + _totalLikes.width;
			_likesTxt.y = _totalLikes.y;
			_likesTxt.antiAliasType = AntiAliasType.ADVANCED;
			_likesTxt.autoSize = TextFieldAutoSize.LEFT;
			
			_dislikesTxt.embedFonts = true;
			_dislikesTxt.name = '_dislikesTxt';
			_dislikesTxt.setTextFormat(_textFormat2);
			_dislikesTxt.x = 131;
			_dislikesTxt.y = _totalLikes.y;
			_dislikesTxt.antiAliasType = AntiAliasType.ADVANCED;
			//_dislikesTxt.autoSize = TextFieldAutoSize.RIGHT;
			
			_totalDislikes.embedFonts = true;
			_totalDislikes.name = 'totalDislikes';
			_totalDislikes.x = _dislikesTxt.x - _dislikesTxt.width;
			_totalDislikes.y = _totalLikes.y;
			_totalDislikes.height = 16;
			_totalDislikes.autoSize = TextFieldAutoSize.RIGHT;
			
			graph.addChild(graphBGRect);
			graph.addChild(_likesBar);
			graph.addChild(_likesTxt);
			graph.addChild(_dislikesTxt);
			graph.addChild(_totalDislikes);
			graph.addChild(_totalLikes);
			addChild(graph);
		}
		
		private function getCurrentRatings():void
		{	
			var loader:URLLoader = new URLLoader();
			
			loader.addEventListener(Event.OPEN, openHandler);
			loader.addEventListener(Event.COMPLETE, completeHandler);
			loader.addEventListener(IOErrorEvent.IO_ERROR, ioErrorHandler);
			
			// request for getting previous ratings on Video
			var getRating:URLRequest = new URLRequest( _url );
			getRating.method = URLRequestMethod.POST;
			try {
				loader.load(getRating);
			} catch (error:Error) {
				debug("Unable to make request.");
			}
			
		}
		
		private function openHandler(event:Event):void
		{
			debug("open handler: " + event);
		}
		
		private function completeHandler(event:Event):void
		{
			var likes:Number = 0;
			var dislikes:Number = 0;
			
			var loader:URLLoader = URLLoader(event.target);
			
			//strip unwanted characters from JSON string
			var jsonBlock:String = loader.data;
			jsonBlock = jsonBlock.replace("-","");
			
			// --- TODO: JSON Decode block
			var bvVideoObject:Object = com.adobe.serialization.json.JSON.decode(jsonBlock);
			
			var ratings:Array = bvVideoObject.Includes.Products[_bvVideoID].ReviewStatistics.RatingDistribution;
			
			for(var i:uint; i<ratings.length; i++)
			{
				if(ratings[i].RatingValue == 1){
					dislikes = ratings[i].Count;
				}else if(ratings[i].RatingValue == 5){
					likes = ratings[i].Count;
				}
			}
			
			displayCurrentRatings(likes, dislikes);
		}
		
		private function ioErrorHandler(event:IOErrorEvent):void
		{
			//debug("ioErrorHandler: " + event);
		}
		
		private function displayCurrentRatings(likes:Number, dislikes:Number):void
		{
			debug("Amount of Likes: " + likes);
			debug("Amount of Dislikes: " + dislikes);
			
			// comma format likes and dislikes
			var likesFormatted:String = likes.toString().replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
			var dislikesFormatted:String = dislikes.toString().replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
			
			// compensate for 1 Like/Dislike
			if(likes == 1)
			{
				_likesTxt.text = "like";
				_likesTxt.setTextFormat(_textFormat2);
			}
			else
			{
				_likesTxt.text = "likes";
				_likesTxt.setTextFormat(_textFormat2);
			}
			
			if(dislikes == 1)
			{
				_dislikesTxt.text = "dislike";
				_dislikesTxt.x = 138;
				_dislikesTxt.setTextFormat(_textFormat2);
				_totalDislikes.x += 8;
			}
			else
			{
				_dislikesTxt.text = "dislikes";
				_dislikesTxt.setTextFormat(_textFormat2);
			}
			
			// Updating text UI
			_totalLikes.text = likesFormatted;
			_totalLikes.setTextFormat(_textFormat2);
			_likesTxt.x = _totalLikes.x + _totalLikes.textWidth + 4;
			
			_totalDislikes.text = dislikesFormatted;
			_totalDislikes.setTextFormat(_textFormat2);
			
			if( getParamValue("likes") ){
				_totalLikes.text = getParamValue("likes");
				_totalLikes.setTextFormat(_textFormat2);
				_likesTxt.x = _totalLikes.x + _totalLikes.textWidth + 4;
			}
			
			if( getParamValue("dislikes") ){
				_totalDislikes.text = getParamValue("dislikes");
				_totalDislikes.setTextFormat(_textFormat2);
			}
			
			// getting perectage of Likes
			var totalVotes:Number = likes + dislikes;
			_likesPercent = (likes/totalVotes);
			
			debug("Percentage of Likes Equals = " + _likesPercent);
			
			_likesBar.width = 178 * _likesPercent;
			_likesBar.alpha = 1;
		}
		
		public function getParamValue(key:String, onlyCheckPluginParams:Boolean = false):String
		{
			if(!onlyCheckPluginParams)
			{
				//1: check url params for the value
				var url:String = _experienceModule.getExperienceURL();
				if(url.indexOf("?") !== -1)
				{
					var urlParams:Array = url.split("?")[1].split("&");
					for(var i:uint = 0; i < urlParams.length; i++)
					{
						var keyValuePair:Array = urlParams[i].split("=");
						if(keyValuePair[0] == key) 
						{
							return keyValuePair[1];
						}
					}
				}
				
				//2: check player params for the value
				var playerParam:String = _experienceModule.getPlayerParameter(key);
				if(playerParam) 
				{
					return playerParam;
				}
			}
			
			//3: check plugin params for the value
			var pluginParams:Object = LoaderInfo(this.root.loaderInfo).parameters;
			for(var param:String in pluginParams)
			{
				if(param == key) 
				{
					return pluginParams[param];
				}
			}
			
			return null;
		}
		
		public function debug(message:String):void
		{
			_experienceModule.debug(message);
		}
	}
}