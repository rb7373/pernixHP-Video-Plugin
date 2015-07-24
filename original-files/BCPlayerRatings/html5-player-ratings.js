(function() {
    //global variables
    var _mediaAPIToken = "ILssOMrqpCo7eJh0weJVl8x21BEeaoE-eTtpiCrIcmc.";
    var _bvHostName = "apitestcustomer.ugc.bazaarvoice.com/bvstaging";
    var _bvPassKey = "stq9t01nsnvlk2drx5b7q5zzm";
    var _parentURL = window.location.href;
    var _bvAPIVersion = "5.4";
    var _videoID,
        _bvVideoID,
        _bvUserRating,
        _bvUserName;
        
    var guidCookie;
    var _uniqueID;
    var videoTag;
        
    // Button Images
    var THUMBS_UP_IMG = "http://psdev.brightcove.com/hp-ratings/assets/thumbs-up-off.png";
    var THUMBS_DOWN_IMG = "http://psdev.brightcove.com/hp-ratings/assets/thumbs-down-off.png";
    var THUMBS_UP_IMG_ON = "http://psdev.brightcove.com/hp-ratings/assets/thumbs-up-on.png";
    var THUMBS_DOWN_IMG_ON = "http://psdev.brightcove.com/hp-ratings/assets/thumbs-down-on.png";
    
    // embed jquery to iframe DOM
    var script = document.createElement('script');
    script.type= "text/javascript";
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(script);
    
    // retrieve bvHostName
    if(_parentURL.indexOf('bvHostname=') !== -1){
        debug("***host name is in the URL!***");
        
        var bvHostIndex = _parentURL.indexOf('bvHostname=');
        _bvHostName = _parentURL.substring(bvHostIndex+11);
        
        debug("***host name is :" + _bvHostName);
        
        // substring until next query arg if it is not the last in URL
        if(_bvHostName.indexOf('&') !== -1){
            var bvHostEndIndex = _bvHostName.indexOf('&');
            _bvHostName = _bvHostName.substring(0, bvHostEndIndex);
        }
        debug("Final Host: " + _bvHostName);
    }
    
    // retrieve bvPassKey
    if(_parentURL.indexOf('bvPassKey=') !== -1){
        debug("***Pass Key is in the URL!***");
        
        var bvPassIndex = _parentURL.indexOf('bvPassKey=');
        _bvPassKey = _parentURL.substring(bvPassIndex+10);
        
        debug("***Pass Key is :" + _bvPassKey);
        
        // substring until next query arg if it is not the last in URL
        if(_bvPassKey.indexOf('&') !== -1){
            var bvPassEndIndex = _bvPassKey.indexOf('&');
            _bvPassKey = _bvPassKey.substring(0, bvPassEndIndex);
        }
        debug("Final Host: " + _bvPassKey);
    }
    
    var player,
        videoPlayerModule,
        experienceModule;
        
    player = brightcove.api.getExperience();
    videoPlayerModule = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
    experienceModule = player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
    
    if(experienceModule.getReady())
    {
        initialize();
    }
    else
    {
        experienceModule.addEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY, initialize);
    }
    
    //listening for events
    function initialize(evt) {
        debug("***INITIALIZE API***");
        
        // --------- APPEND TAG THAT HOLDS CUSTOM ELEMENTS        
        videoTag = document.getElementById('bcVideo');
        var offsets = getOffsets(videoTag);
        var playerHeight = window.innerHeight;
        console.log("Player Height: " + playerHeight);
        var playerWidth = window.innerWidth;
        console.log("Player Width: " + playerWidth);
        var videoParent = $(videoTag).parent();
        
        $(document.body).append('<div id="custom-elements"></div>');
        $('#custom-elements').css({'position':'absolute','top':(playerHeight - (40 + offsets[1] + 6))+'px','left':offsets[0]+'px','z-index':'6','right':offsets[0]+'px'});
        // ---------
        
        displayUIButtons();
        
        //construct URL
        videoPlayerModule.getCurrentVideo(constructURLs);
        
        // add Media Events
        videoPlayerModule.addEventListener(brightcove.api.events.MediaEvent.CHANGE, onMediaChange);
    }
    
    function constructURLs(result) {
        _videoID = result.id;
        _bvVideoID = "bcvid-" + _videoID;
        
        // construct URLS for API
        debug(constructSubmitRating(_bvHostName, _bvPassKey, _bvVideoID));
        debug(constructRatingDetails(_bvHostName, _bvPassKey, _videoID));
        
        // get existing cookies on Player Load
        debug("Player Load First Video ID: " + _bvVideoID);
        
        // check first video for cookies
        checkVideoForCookies(_bvVideoID);
        
        
        getCurrentVideoRatings(_bvVideoID);
        displayTotalViews(_videoID);
    }
    
    /**--------------------------------------------------------- URL REQUEST FUNCTIONS **/
    
    $(document).ready(function() {
        debug("Jquery");
        debug(uniqueid());
    });
    
    /**--------------------------------------------------------- EVENT HANDLERS **/
    
    function onMediaChange() {
        debug("Media Change");
        resetButtonIcons();
        videoPlayerModule.getCurrentVideo(changeVidCallback);
    }
    
    function changeVidCallback(result) {
        _videoID = result.id;
        _bvVideoID = "bcvid-" + _videoID;
        
        debug("Media Change: " + _bvVideoID);
        checkVideoForCookies();
        
        getCurrentVideoRatings(_bvVideoID);
        displayTotalViews(_videoID);
    }
    
    function onThumbsUpClick() {
        // if unique ID is not set for this user yet...i.e., it's their first rating
        if(!_uniqueID){
            _uniqueID = uniqueid();
            _bvUserName = _uniqueID.substr(0,23);
        }
        
        if(!guidCookie){
            disableButtons();
            setCookie(_bvVideoID, _uniqueID + "," + _bvVideoID + ",5");
            enableThumbsUpIcon();
            
            // submit rating
            submitRating('5');
        }else{
            debug("You already have a GUID: " + guidCookie);
        }
    }
    
    function onThumbsDownClick() {
        // if unique ID is not set for this user yet...i.e., it's their first rating
        if(!_uniqueID){
            _uniqueID = uniqueid();
            _bvUserName = _uniqueID.substr(0,23);
        }
        
        if(!guidCookie){
            disableButtons();
            setCookie(_bvVideoID, _uniqueID + "," + _bvVideoID + ",1");
            enableThumbsDownIcon();
            
            // submit rating
            submitRating('1');
        }else{
            debug("You already have a GUID: " + guidCookie);
        }
    }
    
    function submitRating(rating){
        $.post( constructSubmitRating(_bvHostName, _bvPassKey, _bvVideoID, rating) + "&callback=?",
          function(json) {
            debug(json);
        });
    }
    
    function enableThumbsUpIcon() {
        debug($('#thumbs-up'));
        $('#thumbs-up').children('img').attr('src',THUMBS_UP_IMG_ON);
    }
    
    function enableThumbsDownIcon() {
        debug($('#thumbs-down'));
        $('#thumbs-down').children('img').attr('src',THUMBS_DOWN_IMG_ON);
    }
    
    function disableButtons() {
        $('#thumbs-up').unbind("click",onThumbsUpClick);
        $('#thumbs-down').unbind("click",onThumbsDownClick);
        $('#thumbs-up, #thumbs-down').css({'cursor':'auto'});
    }
    
    function resetButtonIcons() {
        $('#thumbs-up').children('img').attr('src',THUMBS_UP_IMG);
        $('#thumbs-down').children('img').attr('src',THUMBS_DOWN_IMG);
        $('#thumbs-up, #thumbs-down').css({'cursor':'pointer'});
    }
    
    /**--------------------------------------------------------- UI ELEMENTS **/
    
    function displayUIButtons() {
        $('#custom-elements').append('<div class="ratings"><div id="thumbs-up"><img src="' + THUMBS_UP_IMG + '" /></div><div id="thumbs-down"><img src="' + THUMBS_DOWN_IMG + '" /></div></div>');
        $('.ratings').css('width','125px');
        $('#thumbs-up, #thumbs-down').css({'float':'left','position':'relative','z-index':'5','margin-right':'10px','cursor':'pointer'});
        debug("display UI Buttons");
    }
    
    function drawBarGraph(likes, dislikes) {
        // remove any existing bar graph data
        $('#video-ratings').remove();
        
        // convert amount of likes to percent
        var totalVotes = likes + dislikes;
        var likesPercent = totalVotes ? likes / totalVotes : 0;
        
        debug("Percentage of Likes: " + likesPercent + "%");
        
        // to get width, multiply width of bar against percent
        var likeBarWidth = 178 * likesPercent;
        
        $('#custom-elements').append('<div id="video-ratings" style="position:relative;float:left;width:178px;top:0;"><canvas id="barGraphBG" width="178" height="8" style="position:absolute;top:0;left:0;"></canvas></div>');
        
        var canvasBG = document.getElementById('barGraphBG');
        var contextBG = canvasBG.getContext('2d');
  
        contextBG.beginPath();
        contextBG.rect(0, 0, 178, 8);
        contextBG.fillStyle = "#bbbbbb";
        contextBG.fill();
        
        debug(canvasBG);
        
        $('#video-ratings').append('<canvas id="canvasLikes" width="178" height="8" style="position:absolute;top:0px;left:0;"></canvas>');
        
        var likeCanvas = document.getElementById('canvasLikes');
        var likeContext = likeCanvas.getContext('2d');
        var likeWidth = likeBarWidth;
  
        likeContext.beginPath();
        likeContext.rect(0, 0, likeWidth, 8);
        likeContext.fillStyle = "#0990d2";
        likeContext.fill();
        
        debug(likeCanvas);
        
        // print likes and dislikes
        $('#video-ratings').append('<p id="total-likes"></p>');
        $('#video-ratings').append('<p id="total-dislikes"></p>');
        $('#video-ratings > p').css({'font-family':'Arial','font-size':'10px','font-weight':'bold','position':'absolute','top':'2px',});
        $('#video-ratings > p:last-child').css({'right':'0'});
        
        var totalLikesDiv = document.getElementById('total-likes');
        var totalDislikesDiv = document.getElementById('total-dislikes');
        
        totalLikesDiv.innerHTML = (likes == 1) ? likes + " Like" : likes + " Likes";
        totalDislikesDiv.innerHTML = (dislikes == 1) ? dislikes + " Dislike" : dislikes + " Dislikes";
        debug($('#video-ratings'));
    }
    
    function displayTotalViews(videoID) {
        // remove any existing views tags
        $('#total-video-views').remove();
        
        // re-add to custom DIV
        $('#custom-elements').append('<div id="total-video-views" style="float:right;font-family:Arial;font-size:16px;font-weight:bold;position:relative;top:8px;"></div>');
        
        // overwrite Media API token if present in override variables
        if( _parentURL.indexOf('apiToken=') !== -1 ) {
            apiTokenIndex = _parentURL.indexOf('apiToken=');
            _mediaAPIToken = _parentURL.substring(apiTokenIndex+9);
            
            if(_mediaAPIToken.indexOf('&') !== -1){
                apiTokenEndIndex = _mediaAPIToken.indexOf('&');
                _mediaAPIToken = _mediaAPIToken.substring(0, apiTokenEndIndex);
            }
            
            debug("Media API Token was overriden to: " + _mediaAPIToken);
        }
        
        var mediaAPIRequest = "http://api.brightcove.com/services/library?command=find_video_by_id&video_fields=playsTotal&token=" + _mediaAPIToken + "&video_id=" + videoID;
        debug(mediaAPIRequest);
        
        $.getJSON(mediaAPIRequest + "&callback=?", function(data) {
            var items = [];
            
            var playsTotal = data.playsTotal ? data.playsTotal : "0";
            playsTotal += " Views";
        
            $('#total-video-views').text(playsTotal);
        });
        
    }
    
    /**--------------------------------------------------------- SET/GET COOKIES **/
    function setCookie(c_name,value,exdays) {
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie=c_name + "=" + c_value;
    }
    
    function getCookie(c_name) {
        var i,x,y,ARRcookies=document.cookie.split(';');
        for (i=0;i<ARRcookies.length;i++){
            x=ARRcookies[i].substr(0,ARRcookies[i].indexOf('='));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf('=')+1);
            x=x.replace(/^\s+|\s+$/g,'');
            if (x==c_name) {
                return unescape(y);
            }
        }
    }
    
    function checkVideoForCookies(_bvVideoId) {
        debug("Check Video for Cookies");
        guidCookie = getCookie(_bvVideoID);
        
        if(guidCookie){
            debug("(Check Video For Cookies) This Video already has a GUID cookie: " + guidCookie);
            
            var cookieArray = guidCookie.split(",");
            debug(cookieArray);
            
            // set the uniqueID to the existing one in the cookie:
            _uniqueID = cookieArray[0];
            debug("Existing User ID Found: " + _uniqueID);
            _bvUserName = _uniqueID.substr(0,23);
            
            if(cookieArray.indexOf(_bvVideoID) !== -1){
                debug("This is the Video recorded in the cookie!");
                debug(cookieArray[2]);
                if(cookieArray[2] == "5"){
                    debug("This Video was rated a Thumbs Up!");
                    $('#thumbs-up').ready(function(){
                        debug("Thumbs Up is ready.");
                    });
                    enableThumbsUpIcon();
                }else if(cookieArray[2] == "1"){
                    debug("This Video was rated a Thumbs Down...");
                    $('#thumbs-down').ready(function(){
                        debug("Thumbs Down is ready.");
                        enableThumbsDownIcon();
                    });
                }
            }
            
            //unbind click events and remove cursor css
            disableButtons();
            
        }else{
            debug("This Video doesn't have any existing cookies on this browser, attach click events");
            // attach click handlers
            $('#thumbs-up').bind("click",onThumbsUpClick);
            $('#thumbs-down').bind("click",onThumbsDownClick);
            debug("Click listeners bound");
        }
    }
    
    function getCurrentVideoRatings(currentBVVideoID) {
        var likes = 0;
        var dislikes = 0;
        
        debug( constructRatingDetails(_bvHostName, _bvPassKey, _bvVideoID) );
        // --------- KEEP IN SEPARATE FUNCTION??? (getCurrentVideoRatings?)
        $.ajaxSetup({ cache: true });
        $.getJSON( constructRatingDetails(_bvHostName, _bvPassKey, _bvVideoID) + "&callback=?",
          function(json) {
              debug("JSONP Response: ");
              debug(json);
              jQuery.each(json.Results, function(index, result) {
                    debug( result );
                    if( result.Rating == "1" ) {
                        debug( "Increment Dislikes" );
                        dislikes++;
                    }else if( result.Rating == "5" ) {
                        debug( "Increment Likes" );
                        likes++;
                    }
              });
              debug( "Total Likes: " + likes );
              debug( "Total Dislikes: " + dislikes );
              
              drawBarGraph(likes, dislikes);
        });
        // ---------
    }
    
    /**--------------------------------------------------------- URL CONSTRUCT FUNCTIONS **/
    function constructSubmitRating(bvHost, bvPassKey, videoID, userRating) {
        var bvSubmitRatingURL = "http://" + bvHost + "/data/submitreview.json?apiversion=" + 
                _bvAPIVersion + "&passkey=" + bvPassKey + "&productId=" + videoID +
                "&action=submit&rating=" + userRating +
                "&UserLocation=Home&UserEmail=" + _bvUserName + "@useremail.com" + "&UserNickname=" + _bvUserName +
                "&ReviewText=testtesttesttesttesttestesttest%20testtesttesttesttesttestesttest%20testtesttesttesttesttestesttest" +
                "&title=Default%20review%20title&UserId=" + _bvUserName + "&callback=callback";
        
        return bvSubmitRatingURL;
    }
    
    /*function constructRetrieveRating(bvHost, bvPassKey, videoID) {
            var bvRetrieveRatingURL = "http://" + bvHost + "/data/reviews.json?apiversion=" + 
                    _bvAPIVersion + "&passkey=" + bvPassKey + "&filter=id:" + videoID +
                    "&callback=callback";
            
            return bvRetrieveRatingURL;
    }*/
    
    function constructRatingDetails(bvHost, bvPassKey, videoID) {
            var bvRatingDetailsURL = "http://" + bvHost + "/data/reviews.json?apiversion=" + 
                    _bvAPIVersion + "&passkey=" + bvPassKey + "&filter=productId:" + videoID +
                    "&include=products&stats=reviews";
            
            return bvRatingDetailsURL;
    }
    
    function getOffsets(obj) {
        var curleft = 0;
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
        return [curleft, curtop];
    }

    /**----------------------------UNIQUE ID **/
    function uniqueid() {
        // always start with a letter (for DOM friendlyness)
        var idstr=String.fromCharCode(Math.floor((Math.random()*25)+65));
        do {                
            // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
            var ascicode=Math.floor((Math.random()*42)+48);
            if (ascicode<58 || ascicode>64){
                // exclude all chars between : (58) and @ (64)
                idstr+=String.fromCharCode(ascicode);    
            }                
        } while (idstr.length<32);
        
        return (idstr);
    }

    function debug (message) {
        return;
        console.log(message);
    }
        
}());