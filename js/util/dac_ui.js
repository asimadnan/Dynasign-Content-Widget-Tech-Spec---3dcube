 /*
 * Dynasign Proprietary and Confidential
 * 
 * Dynasign © 2016 Dynasign Corporation 
 * All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains the property of Dynasign Corporation and its suppliers.
 * The intellectual and technical concepts contained herein are proprietary to Dynasign Corporation and its suppliers 
 * and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden 
 * without the prior written consent of Dynasign Corporation.
 */
function DacUI() 
{
    //1         2	3	4	5	7	10	20	50	100	1000
    //0%	10%	15%	20%	25%	30%	35%	40%	50%	55%	60%

    this.getWidgetVolumeDiscount = function(numPlayers)
    {
        var discount = 0;
        if (numPlayers==1)
            discount = 0;
        else if (numPlayers==2)
            discount = 0.1;
        else if (numPlayers==3)
            discount = 0.15;
        else if (numPlayers==4 )
            discount = 0.2;
        else if (numPlayers>=5 && numPlayers <7)
            discount = 0.25;
        else if (numPlayers>=7 && numPlayers <10)
            discount = 0.3;
        else if (numPlayers>=10 && numPlayers <20)
            discount = 0.35;
        else if (numPlayers>=20 && numPlayers <50)
            discount = 0.4;
        else if (numPlayers>=50 && numPlayers <100)
            discount = 0.5;
        else if (numPlayers>=100 && numPlayers<1000)
            discount = 0.55;
        else if (numPlayers>=1000)
            discount = 0.6;
        
       return discount;

    }

}
