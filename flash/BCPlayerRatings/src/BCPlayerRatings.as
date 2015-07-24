package
{
	import com.brightcove.api.APIModules;
	import com.brightcove.api.CustomModule;
	import com.brightcove.api.components.SWFLoader;
	import com.brightcove.api.events.ExperienceEvent;
	import com.brightcove.api.events.MediaEvent;
	import com.brightcove.api.modules.ExperienceModule;
	import com.brightcove.api.modules.VideoPlayerModule;
	import com.hp.ratings.BarGraph;
	import com.hp.ratings.GUID;
	import com.hp.ratings.ThumbsDown;
	import com.hp.ratings.ThumbsUp;
	import com.hp.ratings.VideoViews;
	
	import flash.display.Bitmap;
	import flash.display.DisplayObject;
	import flash.display.LoaderInfo;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.events.MouseEvent;
	import flash.net.SharedObject;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.net.URLRequestMethod;
	import flash.net.URLVariables;
	
	public class BCPlayerRatings extends CustomModule
	{
		private var _experienceModule:ExperienceModule;
		private var _videoPlayerModule:VideoPlayerModule;
		
		private var _isRated:Boolean = false;
		private var _ratedVideo:String;
		private var _videoID:String;
		private var _sharedObj:SharedObject;
		private var _videoViews:String;
		// Default Read API Token: HP Customer Care Account
		private var _apiToken:String = "my6hUiO79xyZCTZ9iR6pGtTxucFdOV9ay4Ip2hnJ5c2wm20pvN4xAw..";
		
		private var _ratingX:Number;
		private var _ratingY:Number;
		private var _ratingWidth:Number;
		
		// BV URL variables
		private var _bvRetrieveRatingURL:String;
		private var _bvRatingDetailsURL:String;
		private var _bvVideoID:String;
		private var _bvHostname:String = "apitestcustomer.ugc.bazaarvoice.com/bvstaging";
		private var _bvPassKey:String = "stq9t01nsnvlk2drx5b7q5zzm";
		private var _bvAPIVersion:String = "5.4";
		private var _bvUserRating:String;
		private var _bvUserName:String;
		
		private var _thumbsDown:ThumbsDown = new ThumbsDown();
		private var _thumbsUp:ThumbsUp = new ThumbsUp();
		
		public function BCPlayerRatings()
		{
			trace("@project BC Player Ratings - HP integrations with BazaarVoice");
			trace("@author Mikey Carreiro");
			trace("@lastModified 03.06.13 1154 PST");
			trace("@version 0.0.1");
		}
		
		override protected function initialize():void
		{
			_experienceModule = player.getModule(APIModules.EXPERIENCE) as ExperienceModule;
			_videoPlayerModule = player.getModule(APIModules.VIDEO_PLAYER) as VideoPlayerModule;
			
			//overwrite Player-level values, if available
			if( getParamValue("bvHostname") )
			{
				_bvHostname = getParamValue("bvHostname");
			}
			
			if( getParamValue("bvPassKey") )
			{
				_bvPassKey = getParamValue("bvPassKey");
			}
			
			if( getParamValue("apiToken") )
			{
				_apiToken = getParamValue("apiToken");
			}
			
			// get current video
			if( _videoPlayerModule.getCurrentVideo() )
			{
				_videoID = _videoPlayerModule.getCurrentVideo().referenceId ? _videoPlayerModule.getCurrentVideo().referenceId : _videoPlayerModule.getCurrentVideo().id.toString();
				_bvVideoID = "bcvid-" + _videoID;
			}
			
			debug( "*****Call to Submit Rating: " + constructSubmitRating(_bvHostname) );
			debug( "*****Call to Retrieve Rating Details: " + constructRatingDetails(_bvHostname, _bvPassKey, _bvVideoID) );
			
			// set up BEML Button
			if( _experienceModule.getElementByID("playerRatings") ){
				var playerRatingSWF:SWFLoader = _experienceModule.getElementByID("playerRatings") as SWFLoader;
				
				_ratingX = playerRatingSWF.getX();
				_ratingY = playerRatingSWF.getY(true);
				_ratingWidth = playerRatingSWF.getWidth();
				
				displayViews();
				displayRatingUI();
			}
			
			setUpEventListeners();
			
			//getCurrentRatings();
			var barGraph:BarGraph = new BarGraph(constructRatingDetails(_bvHostname, _bvPassKey, _bvVideoID), _experienceModule, _videoPlayerModule, _bvVideoID);
			barGraph.name = 'barGraph';
			barGraph.x = _thumbsDown.x + _thumbsDown.width + 10;
			barGraph.y = _ratingY + 5;
			_experienceModule.getStage().addChild(barGraph);
			
			getSharedObjectData();
		}
		
		private function setUpEventListeners():void
		{
			_videoPlayerModule.addEventListener(MediaEvent.CHANGE, onMediaChange);
			_experienceModule.addEventListener(ExperienceEvent.ENTER_FULLSCREEN, onEnterFullScreen);
			_experienceModule.addEventListener(ExperienceEvent.EXIT_FULLSCREEN, onExitFullScreen);
		}
		
		/**-----------------------------------------------------------------------------EVENT HANDLERS */
		
		private function onMediaChange(evt:MediaEvent):void
		{
			// update Video ID
			_videoID = _videoPlayerModule.getCurrentVideo().referenceId ? _videoPlayerModule.getCurrentVideo().referenceId : _videoPlayerModule.getCurrentVideo().id.toString();
			_bvVideoID = "bcvid-" + _videoID;
				
			debug( "*****Call to Submit Rating: " + constructSubmitRating(_bvHostname) );
			debug( "*****Call to Retrieve Rating Details: " + constructRatingDetails(_bvHostname, _bvPassKey, _bvVideoID) );
			
			resetButtons();
			getSharedObjectData();
			
			// reset bar graph
			var oldBarGraph:Sprite = _experienceModule.getStage().getChildByName('barGraph') as Sprite;
			_experienceModule.getStage().removeChild(oldBarGraph);
			
			var barGraph:BarGraph = new BarGraph(constructRatingDetails(_bvHostname, _bvPassKey, _bvVideoID), _experienceModule, _videoPlayerModule, _bvVideoID);
			barGraph.name = 'barGraph';
			barGraph.x = _thumbsDown.x + _thumbsDown.width + 10;
			barGraph.y = _ratingY + 5;
			_experienceModule.getStage().addChild(barGraph);
		}
		
		private function onEnterFullScreen(e:ExperienceEvent):void
		{
			// NOTE: Current solution hides all custom elements outside of the Player
			// from Stage in Full Screen Mode
			for(var i:uint=1; i<_experienceModule.getStage().numChildren; i++)
			{
				_experienceModule.getStage().getChildAt(i).x -= 5000;
				_experienceModule.getStage().getChildAt(i).alpha = 0;
			}
		}
		
		private function onExitFullScreen(e:ExperienceEvent):void
		{
			for(var i:uint=1; i<_experienceModule.getStage().numChildren; i++)
			{
				_experienceModule.getStage().getChildAt(i).x += 5000;
				_experienceModule.getStage().getChildAt(i).alpha = 1;
			}
		}
		
		/**-----------------------------------------------------------------------------URL REQUESTS */

		
		
		/**-----------------------------------------------------------------------------URL EVENT HANDLERS */
		
		private function openSubmitHandler(event:Event):void
		{
			debug("open submit handler: " + event);
		}
		
		private function completeSubmitHandler(event:Event):void
		{
			debug("complete submit handler: " + event);
		}
		
		private function ioErrorSubmitHandler(event:IOErrorEvent):void
		{
			debug("ioErrorHandler: " + event);
		}
		
		/**-----------------------------------------------------------------------------DISPLAY FUNCTIONS */
		
		private function displayViews():void
		{
			
			var playsTotal:VideoViews = new VideoViews(_experienceModule, _videoPlayerModule, _apiToken, _ratingWidth);
			playsTotal.name = 'playsTotal';
			playsTotal.x = _ratingX;
			playsTotal.y = _ratingY;
			playsTotal.width = _ratingWidth;
			
			_experienceModule.getStage().addChild(playsTotal);
		}
		
		private function displayRatingUI():void
		{			
			_thumbsUp.name = 'thumbsUp';
			_thumbsUp.x = _ratingX;
			_thumbsUp.y = _ratingY;
			
			_thumbsDown.name = 'thumbsDown';
			_thumbsDown.x = _thumbsUp.x + _thumbsUp.width + 7;
			_thumbsDown.y = _thumbsUp.y;
			
			_experienceModule.getStage().addChild(_thumbsUp);
			_experienceModule.getStage().addChild(_thumbsDown);
			
			_thumbsUp.addEventListener(MouseEvent.CLICK, onThumbsUpClick);
			_thumbsDown.addEventListener(MouseEvent.CLICK, onThumbsDownClick);
		}
		
		private function onThumbsDownClick(evt:MouseEvent):void
		{
			if(!_isRated){
				_isRated = true;
				
				// disable buttons
				_thumbsDown.disableButton();
				_thumbsUp.disableButton();
				
				// highlight button user clicked
				_thumbsDown.highlightThumbsDown();
				
				// remove click listeners
				_thumbsUp.removeEventListener(MouseEvent.CLICK, onThumbsUpClick);
				_thumbsDown.removeEventListener(MouseEvent.CLICK, onThumbsDownClick);
				
				// set LSO (Flash Cookie) to remember user rated the video a '1'
				setSharedObjectData("1");
				// submit a '1' Rating to BazaarVoice server
				submitRating(1);
			}
		}
		
		private function onThumbsUpClick(evt:MouseEvent):void
		{	
			if(!_isRated){
				_isRated = true;
				
				// disable buttons
				_thumbsUp.disableButton();
				_thumbsDown.disableButton();
				
				// highlight button user clicked
				_thumbsUp.highlightThumbsUp();
				
				// remove click listeners
				_thumbsDown.removeEventListener(MouseEvent.CLICK, onThumbsDownClick);
				_thumbsUp.removeEventListener(MouseEvent.CLICK, onThumbsUpClick);
				
				// set LSO (Flash Cookie) to remember user rated the video a '5'
				setSharedObjectData("5");
				// submit a '5' Rating to BazaarVoice server
				submitRating(5);
			}
		}
		
		private function resetButtons():void
		{
			_thumbsUp.resetButton();
			_thumbsDown.resetButton();
		}
		
		private function setSharedObjectData(userRating:String):void
		{
			_sharedObj = SharedObject.getLocal(_videoID);

			try{
				// Local Shared Object
				_sharedObj.data.isRated = "true";
				_sharedObj.data.rating = userRating;
				_sharedObj.data.videoID = _videoID;
				if(_bvUserName){
					_sharedObj.data.GUID = _bvUserName;
				}else{
					var uniqueGUID:String = GUID.create();
					_sharedObj.data.GUID = uniqueGUID.split('-').join('').substr(0,23);
					_bvUserName = _sharedObj.data.GUID;
				}
				
				_sharedObj.flush();
				_sharedObj.close();
			}catch(e:Error){
				debug("Error! " + e.toString());
				return;
			}
			
		}
		
		private function getSharedObjectData():void
		{
			_sharedObj = SharedObject.getLocal(_videoID);
			
			_isRated = _sharedObj.data.isRated;
			_ratedVideo = _sharedObj.data.videoID;
			
			if(_isRated){
				
				//check cookie for GUID; if GUID exists, set to _bvUserName; if no GUID, grab new one
				if(_sharedObj.data.GUID)
				{
					_bvUserName = _sharedObj.data.GUID;
				}else{
					_bvUserName = GUID.create();
				}
				
				
				if(_ratedVideo == _videoID){
					_bvUserRating = _sharedObj.data.rating;
					
					// remove event listeners on thumbs up/down buttons
					_thumbsUp.disableButton();
					_thumbsUp.removeEventListener(MouseEvent.CLICK, onThumbsUpClick);
					_thumbsDown.disableButton();
					_thumbsDown.removeEventListener(MouseEvent.CLICK, onThumbsDownClick);
					
					if(_bvUserRating == "1"){
						_thumbsDown.highlightThumbsDown();
					}else if(_bvUserRating == "5"){
						_thumbsUp.highlightThumbsUp();
					}
				}
				
			}else{
				// re-enable buttons
				_thumbsUp.enableButton();
				_thumbsDown.enableButton();
				
				// re-add click event to buttons
				_thumbsUp.addEventListener(MouseEvent.CLICK, onThumbsUpClick);
				_thumbsDown.addEventListener(MouseEvent.CLICK, onThumbsDownClick);
			}
		}
		
		/**-----------------------------------------------------------------------------URL REQUESTS */
		
		private function submitRating(userRating:Number):void
		{
			var loader:URLLoader = new URLLoader();
			
			// request for getting previous ratings on Video
			var getRating:URLRequest = new URLRequest( constructSubmitRating(_bvHostname) );
			getRating.method = URLRequestMethod.POST;
			
			// construct POST variables
			var variables:URLVariables = new URLVariables();
			variables.apiversion = _bvAPIVersion;
			variables.passkey = _bvPassKey;
			variables.productId = _bvVideoID;
			variables.action = "submit";
			variables.rating = userRating;
			variables.UserId = _bvUserName;
			variables.UserNickname = _bvUserName;
			variables.UserLocation = "Home";
			variables.UserEmail = _bvUserName + "@useremail.com";
			variables.title = "Default review title";
			variables.ReviewText = "testtesttesttesttesttestesttest testtesttesttesttesttestesttest testtesttesttesttesttestesttest";
			variables.callback = "callback";
			
			getRating.data = variables;
			
			loader.addEventListener(Event.OPEN, openSubmitHandler);
			loader.addEventListener(Event.COMPLETE, completeSubmitHandler);
			loader.addEventListener(IOErrorEvent.IO_ERROR, ioErrorSubmitHandler);
			
			try {
				loader.load(getRating);
			} catch (error:Error) {
				debug("Unable to make request.");
			}
		}
		
		/**-----------------------------------------------------------------------------CONSTRUCT URLS */
		
		private function constructSubmitRating(bvHost:String):String
		{	
			var bvSubmitRatingURL:String = "http://" + bvHost + "/data/submitreview.json";
			
			return bvSubmitRatingURL;
		}
		
		private function constructRatingDetails(bvHost:String, bvPassKey:String,videoID:String):String
		{
			var bvRatingDetailsURL:String = "http://" + bvHost + "/data/reviews.json?apiversion=" + 
				_bvAPIVersion + "&passkey=" + bvPassKey + "&filter=productId:" + videoID +
				"&include=products&stats=reviews";
			
			return bvRatingDetailsURL;
		}
		
		/**-----------------------------------------------------------------------------HELPER FUNCTIONS */
		
		/**
		 * Looks for the @param key in the URL of the page, the publishing code of the player, and 
		 * the URL for the SWF itself (in that order) and returns its value.
		 */
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