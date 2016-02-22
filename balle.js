/*Jordy CABANNES*/

//On récupère la hauteur et la largeur de la page web afin
//de centrer comme il faut l'image de la balle.
hauteur=window.innerHeight;
largeur=window.innerWidth;	

//Fonction appelée au chargement de la page qui affiche et centre l'image de la balle.
$(document).ready(function insertImg()
{
	//On enlève les marges, les bordures et les "paddings" du body
	//afin que l'image puisse rebondir sur toute la page.
	$('body').css("margin","0px");
	$('body').css("padding","0px");
	$('body').css("border","0px");

	//On va insérer l'image sur la page web et plus précisément dans 
	//le code html de tp2_partie1.htm grâce à jQuery.
	var image= document.createElement('img');
	image.id="balle";
	image.src="ballon-officiel-final-ligue-des-champions.jpg";
	image.width="50";
	image.height="50";
	
	//On centre l'image de la balle grâce aux variables suivantes.
	hauteurImage=(hauteur/2)-25;
	largeurImage=(largeur/2)-25;
	

	//On ajoute l'image dans tp2_partie1.htm.
	$('body').append(image);
	$('#balle').css("display","block");
	$('#balle').css("padding","0px");
	$('#balle').css("margin","0px");
	$('#balle').css("border","0px");	
	$('#balle').css("padding-left", largeurImage +"px");
	$('#balle').css("padding-top", hauteurImage + "px");
	
});

//On initialise la vitesse à laquelle va se déplacer la balle 
//sur l'axe des abscisses X (suivant la largeur de la fenêtre de la gauche vers la droite), 
//sur l'axe des ordonnées Y (suivant la hauteur de la fenêtre du haut vers le bas).
vitesseX = largeur/10;
vitesseY = largeur/10;	

//variables qui vont être utilisées pour gérer le rebond de la balle sur une paroi.
futurXPrec=Number.POSITIVE_INFINITY;
futurYPrec=Number.POSITIVE_INFINITY;
xPrec=Number.POSITIVE_INFINITY;
yPrec=Number.POSITIVE_INFINITY;

//Cette fonction va permettre de gérer le déplacement de la balle sur une paroi 
//en cas de rebond.
function theoremeDeThales(a, b , d)
{
	var c=(a*d)/b;
	return c;
}

//On appelle toute les 100 millisecondes la fonction qui permet de déplacer l'image de la balle.
var interval = setInterval(deplacerBalle, 100);

//Fonction qui permet de déplacer l'image de la balle.
function deplacerBalle()
{
	
	//On récupère l'image de la balle dans le code html de tp2_partie1.htm.
	var balle=$('#balle');

	//On récupère la largeur et la hauteur de l'image de la balle.
	var largeurBalle=parseInt(balle.css('width'));
	var hauteurBalle=parseInt(balle.css('height'));
	
	//On récupère la position en X et en Y de l'image de la balle.
	var x=parseInt(balle.css('padding-left'));
	var y=parseInt(balle.css('padding-top'));
	
	
	//On calcule la prochaine position en X et en Y de l'image de la balle en fin d'exécution 
	//de la fonction deplacerBalle().
	futurX = x + vitesseX;
	futurY = y + vitesseY;

	//Si dans sa position actuelle (et non future calculée précédemment) la balle se trouve sur une paroi. 	
	if(futurXPrec === 0.0 || futurXPrec===(largeur-largeurBalle) || futurYPrec===0.0 || futurYPrec===(hauteur-hauteurBalle))
	{
		//Si la balle se trouve sur la paroi gauche de la fenêtre, on inverse sa vitesse en X.		
		if(futurXPrec === 0.0)
		{
			vitesseX=Math.abs(vitesseX);	
		}
		//Si la balle se trouve sur la paroi droite de la fenêtre, on inverse sa vitesse en X.	
		if(futurXPrec === (largeur-50.0))
		{
			vitesseX=-Math.abs(vitesseX);	
		}
		//On calcule la position de la balle en X après le rebond.
		futurX = x + vitesseX;
		futurXPrec=Number.POSITIVE_INFINITY;

		//Si la balle se trouve sur la paroi du haut de la fenêtre, on inverse sa vitesse en Y.		
		if(futurYPrec === 0.0)
		{
			vitesseY=Math.abs(vitesseY);	
		}
		//Si la balle se trouve sur la paroi du bas de la fenêtre, on inverse sa vitesse en Y.		
		if(futurYPrec === (hauteur-50.0))
		{
			vitesseY=-Math.abs(vitesseY);	
		}
		//On calcule la position de la balle en Y après le rebond.
		futurY = y + vitesseY;
		futurYPrec=Number.POSITIVE_INFINITY;
	}

	//Si dans sa position future la balle rencontre une paroi de la fenêtre.
	if(futurX < 0.0 || (futurX + largeurBalle) >  largeur || futurY  < 0.0 || (futurY + hauteurBalle) > hauteur)
	{
		//Si la balle va rencontrer la paroi gauche de la fenêtre. On met la balle contre la paroi de gauche
		//et on déplace la balle sur l'axe des ordonnées grâce au théorème de Thalès pour avoir un rebond 
		//convenable à vue d'oeil.  		
		if(futurX < 0.0)
		{
			futurX = 0.0;
			futurY= y - theoremeDeThales(x, vitesseY, vitesseX);
		}
	
		//Si la balle va rencontrer la paroi droite de la fenêtre. On met la balle contre la paroi de droite
		//et on déplace la balle sur l'axe des ordonnées grâce au théorème de Thalès pour avoir un rebond 
		//convenable à vue d'oeil. 
		if((futurX + largeurBalle) >  largeur)
		{
			futurX =largeur-largeurBalle;
			futurY= y +theoremeDeThales((largeur-largeurBalle-x), vitesseX, vitesseY);
		}
		

		//Si la balle va rencontrer la paroi du haut de la fenêtre. On met la balle contre la paroi du haut
		//et on déplace la balle sur l'axe des abscisses grâce au théorème de Thalès pour avoir un rebond 
		//convenable à vue d'oeil. 
		if(futurY < 0.0)
		{
			futurX= x - theoremeDeThales(y, vitesseY, vitesseX);			
			futurY = 0.0;		
		}
		
		//Si la balle va rencontrer la paroi du bas de la fenêtre. On met la balle contre la paroi du bas
		//et on déplace la balle sur l'axe des abscisses grâce au théorème de Thalès pour avoir un rebond 
		//convenable à vue d'oeil. 
		if((futurY+ hauteurBalle) > hauteur)
		{
			futurX= x + theoremeDeThales((hauteur-hauteurBalle-y), vitesseX, vitesseY);	
			futurY = hauteur-hauteurBalle;	
		}
		
		//On stocke futurX dans futurXPrec et furturY dans futurYPrec afin que lors du prochain appel de deplacerBalle(), 
		//dans 100 millisecondes, on exécute les instructions du if ci-dessus et non du else. On pourra alors réaliser le rebond 
		//de la balle.
		futurXPrec=futurX;
		futurYPrec=futurY;

	}
	
	//On affecte à la balle le déplacement suivant l'axe des abscisses et l'axe des ordonnées.
	balle.css("padding-left", futurX +"px");
	balle.css("padding-top", futurY +"px");

}




