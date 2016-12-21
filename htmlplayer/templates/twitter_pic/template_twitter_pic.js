function TemplateTwitterPic(debug) {
    TemplateSocialMediaPic.call(this);
    var _this = this;
    this.m_templateName = "twitter_pic"; 
    this.m_field_feed_logo = "twitter_logo_295x150.png";  

    console.log("[template_twitter_pic] overwrite methods **");
/*
    this.initTemplateUI = function()
    {
        var timestamp = this.m_dacUtil.getCurrentDateTime2();
        console.log("[template_twitter_pic] "+ timestamp+" initTemplateUI ... m_width="+this.m_width+" m_height="+this.m_height);

        this.initStage();

        if (this.m_objInfo['feed_title'].hide != true)
            this.buildBodyBackground();
        //this.buildHeaderBackground();

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
        console.log("[template_twitter_pic] "+ timestamp+" initTemplateUI done... ");
    }
*/
}

TemplateTwitterPic.prototype = Object.create(TemplateSocialMediaPic.prototype);