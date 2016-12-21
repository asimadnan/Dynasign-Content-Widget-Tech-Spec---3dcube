function TemplateTwitter(debug) {
    TemplateSocialMedia.call(this);
    var _this = this;
    this.m_templateName = "twitter"; 

    this.m_field_feed_logo = "../../templates/twitter/media/twitter_logo_295x150.png";  
/*
    console.log("[template_twitter] overwrite methods **");

    this.initTemplateUI = function()
    {
        var timestamp = this.m_dacUtil.getCurrentDateTime2();
        console.log("[template_twitter] "+ timestamp+" initTemplateUI ... m_width="+this.m_width+" m_height="+this.m_height);

        this.initStage();

     //   if (this.m_objInfo['feed_title'].hide != true)
       //     this.buildBodyBackground();
        //this.buildHeaderBackground();
        TemplateBase.prototype.buildWidgetBackground.call(this);
        this.buildTitleText();
        if (JSON.stringify(this.m_feedArray) != '{}' && this.m_feedArray != null)
        {
            if (this.m_objInfo['hr_line'].hide != true)
                this.buildHrLine();
            //start loading all assets
            //PIXI.loader.add('logo',this.m_feed_logo).on("progress", this.loadProgressHandler).load(this.setupImages);

            this.buildBody();
        }
        this.buildFeedLogo();
        var timestamp = this.m_dacUtil.getCurrentDateTime2();
        console.log("[template_twitter] "+ timestamp+" initTemplateUI done... ");
    }
*/
}

TemplateTwitter.prototype = Object.create(TemplateSocialMedia.prototype);