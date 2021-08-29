const CARTEW = 80;
const CARTEH = 80;

class Carte {
	constructor(x,y,f){
		this.posX = x;
		this.posY = y;
		this.face = f;
        this.visible=false;
        this.trouve=false;
	}
	
	dessinerCarte(){
        // r"cupérer chemin du fichier depuis le dossier img/
        var chemin_image;
        if (this.visible==false && this.trouve == false){
            // si l'imahe n'est pas visible ou n'est pas trouvée, elle est cachée
    		chemin_image = "img/cache.jpg";
        }
    	else{
            // sinon, récupérer l'image avec le nom de face de la carte
            chemin_image = "img/"+this.face+".jpg";

        }
        // créer une image 
        var image = new Image();
        image.onload = function() {
            // attendre le chargement de l'image
        };
        // charger l'image
        image.src = chemin_image;
        // mettre les dimension de l'image
        image.height = CARTEH;
        image.width = CARTEW;
        // dessiner l'image
        gc.drawImage(image, this.posX,this.posY);
        //console.log("dessinerCarte", image, this);

    }
               
        

}
