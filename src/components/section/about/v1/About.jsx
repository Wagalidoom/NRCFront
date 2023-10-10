import AboutStyleWrapper from "./About.style";
import logo from "../../../../assets/images/logo.jpg";
import bannerRook from "../../../../assets/images/banniere/rook.gif";
import bannerKing from "../../../../assets/images/banniere/roi.gif";
import bannerQueen from "../../../../assets/images/banniere/reine.gif";
import bannerKnight from "../../../../assets/images/banniere/cavalier.gif";
import bannerPawn from "../../../../assets/images/banniere/pion.gif";
import bannerBishop from "../../../../assets/images/banniere/fou.gif";
import discord from "../../../../assets/images/discord.jpg";
import contrat from "../../../../assets/images/contrat.png";
import retweet from "../../../../assets/images/retweet.png";
import epingle from "../../../../assets/images/epingle.png";
import tableau from "../../../../assets/images/tableau.png";
import ens from "../../../../assets/images/ens.png";
import groupe from "../../../../assets/images/groupe.png";
import coffre from "../../../../assets/images/coffre.jpg";
import mainRoi from "../../../../assets/images/mainRoi.jpg";
import emojiThread from "../../../../assets/images/emojiThread.png";

import faqGif from "../../../../assets/images/faq.gif";
import pawnLogo from "../../../../assets/images/themeSombre/pawn.png";
import kingLogo from "../../../../assets/images/themeSombre/king.png";
import queenLogo from "../../../../assets/images/themeSombre/queen.png";
import bishopLogo from "../../../../assets/images/themeSombre/bishop.png";
import knightLogo from "../../../../assets/images/themeSombre/knight.png";
import rookLogo from "../../../../assets/images/themeSombre/rook.png";

const About = () => {
  return (
    <AboutStyleWrapper>
      <div className="text-content">
        <div>
          <div className="retweet">
            <img src={epingle} className="retweetImg" /> Pinned Tweet
          </div>
        </div>
        <div className="flex">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
            <div className="barreOblique"></div>
          </div>
          <div>
            <div className="title">
              <strong>Number Runner Club</strong> <sup>v1/</sup> <span className="account">@TheNRClub</span>
            </div>
            <div className="description">
              Qu’est ce que le Number Runner Club v1 ?<br /><br />
              A thread <img src={emojiThread} className="retweetImg" style={{marginRight: "0"}} />:<br />
              <div className="contentBanner">
                <img src={logo} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flexMargin">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
            <div className="barreOblique"></div>
          </div>
          <div>
            <div className="title">
              Number Runner Club <sup>v1/</sup> <span className="account">@TheNRClub</span>
            </div>
            <div className="description">
              1/ Le Number Runner Club V1 est une collection déflationniste de 10.000 PFP NFTs pensé pour les noms de domaine d’Ethereum Name Service (ENS). <br />
              <div className="contentBanner">
                <img src={ens} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flexMargin">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
            <div className="barreOblique"></div>
          </div>
          <div>
            <div className="title">
              Number Runner Club <sup>v1/</sup> <span className="account">@TheNRClub</span>
            </div>
            <div className="description">
              Ils existent sur Ethereum Name Service (ENS) un certain nombre de « clubs de noms de domaine » différents.<br /><br />
              Il peut s’agir de clubs de chiffres, de lettres, d’émojis, etc...<br /><br />
              Ils permettent aux initiés de former des clubs sociaux en ligne et d’échanger leurs pensées avec leurs communautés respectives.<br /><br />
              Pour rejoindre un club, il suffit d’enregistrer un nom de domaine ENS sur le site officiel : <a target="_blank" href="https://ens.domains">https://ens.domains</a> ou de l’acheter sur le marché secondaire si celui-ci n’est plus disponible.<br /><br />
              - Exemple : Un détenteur d’une adresse comme abc.eth est considéré comme faisant partie du club des 3Lettres.<br /><br />
              Les marketplaces NFT ont d’ailleurs rapidement adopté cette façon de catégoriser les noms de domaine.<br /><br />
            </div>
          </div>
        </div>
        <div className="flex flexMargin">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
            <div className="barreOblique"></div>
          </div>
          <div>
            <div className="title">
              Number Runner Club <sup>v1/</sup> <span className="account">@TheNRClub</span>
            </div>
            <div className="description">
              Le Number Runner Club V1 s’adresse aux détenteurs des noms de domaine d’Ethereum Name Service (ENS), des clubs suivants :<br />
              - <strong>999Club</strong>; nom avec 3 chiffres: 000 à 999.eth<br />
              - <strong>10kClub</strong>; nom avec 4 chiffres: 0000 à 9999.eth<br />
              - <strong>100kClub</strong>; nom avec 5 chiffres: 00000 à 99999.eth<br />
              <div className="contentBanner">
                <img src={groupe} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flexMargin">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
            <div className="barreOblique"></div>
          </div>
          <div>
            <div className="title">
              Number Runner Club <sup>v1/</sup> <span className="account">@TheNRClub</span>
            </div>
            <div className="description">
              2/ Le Number Runner Club V1 ambitionne de construire une communauté structurée, reconnue et capable de s’adapter à l’évolution du marché et ce, de façon amusante.<br /><br />
              L’objectif final est la création d’un produit où les détenteurs à long terme seront au centre du projet.
            </div>
          </div>
        </div>
        <div className="flex flexMargin">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
            <div className="barreOblique"></div>
          </div>
          <div>
            <div className="title">
              Number Runner Club <sup>v1/</sup> <span className="account">@TheNRClub</span>
            </div>
            <div className="description">
              3/ Comment fonctionne la collection NFT du Number Runner Club V1 ?<br />
              Le Number Runner Club V1 est une collection déflationniste de 10.000 PFP NFTs avec 6 niveaux de rareté sur la collection :<br />
              - ROI : 2 NFTs sur 10.000<br />
              - DAME : 10 NFTs sur 10.000<br />
              - TOUR : 50 NFTs sur 10.000<br />
              - CAVALIER : 100 NFTs sur 10.000<br />
              - FOU : 200 NFTs sur 10.000<br />
              - PION : 9638 NFTs sur 10.000<br /><br />
            </div>
          </div>
        </div>
        <div className="flex flexMargin">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
            <div className="barreOblique"></div>
          </div>
          <div>
            <div className="title">
              Number Runner Club <sup>v1/</sup> <span className="account">@TheNRClub</span>
            </div>
            <div className="description">
              Les futurs détenteurs devront remplir certaines conditions ou effectuer certaines actions pour pouvoir prétendre aux différents niveaux de rareté des NFTs de la collection.<br /><br />
              Chaque NFT du Number Runner Club V1 permet de déléguer son nom de domaine d’Ethereum Name Service (ENS) du <strong>999Club</strong>, <strong>10kClub</strong> ou <strong>100kClub</strong> et ainsi recevoir des récompenses qui seront redistribuées en Ethereum (ETH).<br /><br />
            </div>
          </div>
        </div>
        <div className="flex flexMargin">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
            <div className="barreOblique"></div>
          </div>
          <div>
            <div className="title">
              Number Runner Club <sup>v1/</sup> <span className="account">@TheNRClub</span>
            </div>
            <div className="description">
              Ces récompenses restent bloquées sur le smart-contrat du Number Runner Club V1 et ne peuvent être récupérer que dans 3 cas différents :<br />
              - Vendre son NFT<br />
              - Burn son NFT<br />
              - Ou attendre que la collection atteigne 999 NFTs restant en circulation<br /><br />
            </div>
          </div>
        </div>
        <div className="flex flexMargin">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
            <div className="barreOblique"></div>
          </div>
          <div>
            <div className="title">
              Number Runner Club <sup>v1/</sup> <span className="account">@TheNRClub</span>
            </div>
            <div className="description">
              En plus des récompenses individuelles, une cagnotte générale sera réservée aux 999 derniers NFT restant du Number Runner Club V1.<br /><br />
            </div>
          </div>
        </div>
        <div className="flex flexMargin">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
            <div className="barreOblique"></div>
          </div>
          <div>
            <div className="title">
              Number Runner Club <sup>v1/</sup> <span className="account">@TheNRClub</span>
            </div>
            <div className="description">
              <strong>Chaque détenteur aura deux choix :</strong><br />
              - Conserver ses récompenses en Ethereum (ETH)<br />
              - Acheter un ou plusieurs NFT de la collection si le montant de ses récompenses le permette *<br />
              - Acheter un ou plusieurs noms de domaines en chiffres si le montant de ses récompenses le permette *<br /><br />
              * Ces chiffres restent dans la cagnotte du détenteur. Le détenteur peut récupérer son ou ses chiffres qui si il vend, burn ou attend que les 999NFTS restant en circulation. La taxe retenu est sur la valeur du chiffre au moment ou il l’a acheté.<br /><br />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
          </div>
          <div>
            <div className="title">
              Number Runner Club <sup>v1/</sup> <span className="account">@TheNRClub</span>
            </div>
            <div className="description">
              <strong>Le Number Runner Club V1 gère la cagnotte générale de deux manières :</strong><br />
              - Conserve la cagnotte en Ethereum (ETH)<br />
              - Achète ou revend des noms de domaines en chiffres*<br /><br />
              * Les détenteurs avec les NFTs les plus rares auront un droit de vote sur ces transactions. Ils pourront les refuser si ils jugent qu’elle ne sont pas dans l’intérêt de la communauté.
              <div className="contentBanner">
                <img src={coffre} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-content">
        <div>
          <div className="retweet">
            <img src={retweet} className="retweetImg" />You have retweeted
          </div>
        </div>
        <div className="flex">
          <div className="contentLogo">
            <div className="logo">
              <img src={pawnLogo} className="logoImg"/>
            </div>
          </div>
          <div>
            <div className="title">
              Pion <span className="account">@NRPawn</span>
            </div>
            <div className="description">
              <strong>Supply de 9638 items :</strong><br />
              - 4819 pions blancs<br />
              - 4819 pions noirs<br /><br />
              <strong>Qui peut mint et stacker ?</strong><br />
              - Détenteurs du 999Club, 10kClub et 100kClub<br />
              Ils se partagent 65% des frais de transaction mais diminue progressivement pour atteindre 5%  une fois que les NFTs spéciaux ont été tous mint.<br />
              - Taxe sur la vente: 16% (50% holders | 50% Cagnotte)<br />
              - Taxe sur le Burn: 25% (50% holders et 50%  Cagnotte)
            </div>
            <div className="contentBanner">
              <img src={bannerPawn} />
            </div>
          </div>
        </div>
      </div>
      <div className="text-content">
        <div>
          <div className="retweet">
            <img src={retweet} className="retweetImg" />You have retweeted
          </div>
        </div>
        <div className="flex">
          <div className="contentLogo">
            <div className="logo">
              <img src={kingLogo} className="logoImg"/>
            </div>
            <div className="barreOblique"></div>
          </div>
          <div>
            <div className="title">
              Roi <span className="account">@NRKing</span>
            </div>
            <div className="description">
              <strong>Supply de 2 items :</strong><br />
              -  1 roi blanc<br />
              -  1 roi noir<br /><br />
              Les Rois seront les seuls NFTs de la collection à être vendu sous forme d’enchère hollandaise.<br /><br />
              <strong>Qui peut enchérir ?</strong><br />
              - Détenteurs du 999Club et les détendeurs de palindromes du 10kClub<br /><br />
              Les deux rois se partagent 35% sur les frais de transaction au prorata de l’enchère à laquelle ils ont acquis leurs NFT par rapport à l’autre.<br />
              - Taxe sur la vente: 16% (50% holders | 50% Cagnotte)<br />
              - Burn impossible du Roi.<br /><br />
              Les rois ont le droit de vote sur les achats et ventes de chiffres de la cagnotte.<br />
              Les rois signent les transactions via multisig lorsqu’ils les autorisent.<br /><br />
            </div>
            <div className="contentBanner">
              <img src={bannerKing} />
            </div>
          </div>
        </div>
        <div className="flex flexMargin">
          <div className="contentLogo">
            <div className="logo">
              <img src={kingLogo} className="logoImg"/>
            </div>
          </div>
          <div>
            <div className="title">
              Roi <span className="account">@NRKing</span>
            </div>
            <div className="description">
              Le produit de la vente aux enchères des rois est redistribué entre 10 détenteurs qui découvrent la main du roi sur l’un des pions qu’ils ont mint.*<br /><br />
              * Pour éviter toutes triches, les mains du roi sont crypté et ne sont révélé que lorsque tout les nfts ont été mint. Néanmoins, une fonction de reveal permet de savoir si vous avez en votre possession une main du roi si vous décidiez de burn un nft avant que se soit sold out. 25% de votre cagnotte sera redistribué pour activer la fonction. La cagnotte d’une main du roi burn « sans faire exprès » est redistribué aux autres main du roi.
              <div className="contentBanner">
                <img src={mainRoi} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-content">
        <div>
          <div className="retweet">
            <img src={retweet} className="retweetImg" />You have retweeted
          </div>
        </div>
        <div className="flex">
          <div className="contentLogo">
            <div className="logo">
              <img src={bishopLogo} className="logoImg"/>
            </div>
          </div>
          <div>
            <div className="title">
              Fou <span className="account">@NRBishop</span>
            </div>
            <div className="description">
              <strong>Supply de 200 items :</strong><br />
              -  100 fous blancs<br />
              -  100 fous noirs<br /><br />
              <strong>Comment mint un fou ?</strong><br />
              - Avoir déjà Stacker un NFT de la collection avec une adresse du 999Club, 10kClub ou 100kClub<br />
              - Burn 10 pions que vous aurez mint<br />
              - Avoir une autre adresse du 999Club, 10kClub ou 100kClub palindrome pour stacker le fou que le détenteur recevra.<br />
              Le fou reçoit 10% des frais de transactions.<br /><br />
              - Taxe sur la vente: 16% (50% holders | 50% Cagnotte)<br />
              - Taxe sur le Burn: 25% (50% holders et 50%  Cagnotte)

            </div>
            <div className="contentBanner">
              <img src={bannerBishop} />
            </div>
          </div>
        </div>
      </div>
      <div className="text-content">
        <div>
          <div className="retweet">
            <img src={retweet} className="retweetImg" />You have retweeted
          </div>
        </div>
        <div className="flex">
          <div className="contentLogo">
            <div className="logo">
              <img src={knightLogo} className="logoImg"/>
            </div>
          </div>
          <div>
            <div className="title">
              Cavalier <span className="account">@NRKnight</span>
            </div>
            <div className="description">
              <strong>Supply de 100 items :</strong><br />
              -  50 cavaliers blancs<br />
              -  50 cavaliers noirs<br /><br />
              <strong>Comment mint un cavalier ?</strong><br />
              - Avoir déjà Stacker un NFT de la collection  avec une adresse du 999Club, 10kClub<br />
              - Burn 10 pions  de la couleur adverse acheté sur le marché secondaire<br />
              - Avoir une autre adresse du 999Club, 10kClub pour stacker le cavalier que le détenteur recevra.<br />
              Le cavalier reçoit 12.5% des frais de transactions.<br />
              - Taxe sur la vente: 16% (50% holders | 50% Cagnotte)<br />
              - Taxe sur le Burn: 30% (50% holders et 50%  Cagnotte)
            </div>
            <div className="contentBanner">
              <img src={bannerKnight} />
            </div>
          </div>
        </div>
      </div>
      <div className="text-content">
        <div>
          <div className="retweet">
            <img src={retweet} className="retweetImg" />You have retweeted
          </div>
        </div>
        <div className="flex">
          <div className="contentLogo">
            <div className="logo">
              <img src={rookLogo} className="logoImg"/>
            </div>
          </div>
          <div>
            <div className="title">
              Tour <span className="account">@NRRook</span>
            </div>
            <div className="description">
              <strong>Supply de 50 items :</strong><br />
              -  25 tours blanches<br />
              -  25 tours noires<br /><br />
              <strong>Comment mint une tour ?</strong><br />
              - Avoir déjà Stacker un NFT de la collection  avec une adresse du 999Club, 10kClub<br />
              - Burn 15 pions  de la couleur adverse acheté sur le marché secondaire<br />
              - Avoir une autre adresse du 999Club  pour stacker la tour que le détenteur recevra.<br />
              La tour reçoit 15% des frais de transactions.<br />
              - Taxe sur la vente: 16% (50% holders | 50% Cagnotte)<br />
              - Taxe sur le Burn: 35% (50% holders et 50%  Cagnotte)
            </div>
            <div className="contentBanner">
              <img src={bannerRook} />
            </div>
          </div>
        </div>
      </div>
      <div className="text-content">
        <div>
          <div className="retweet">
            <img src={retweet} className="retweetImg" />You have retweeted
          </div>
        </div>
        <div className="flex">
          <div className="contentLogo">
            <div className="logo">
              <img src={queenLogo} className="logoImg"/>
            </div>
          </div>
          <div>
            <div className="title">
              Reine <span className="account">@NRQueen</span>
            </div>
            <div className="description">
              <strong>Supply de 10 items :</strong><br />
              -  5 dames blanches<br />
              -  5 dames noires<br /><br />
              <strong>Comment mint une dame ?</strong><br />
              - Avoir déjà Stacker un NFT de la collection  avec une adresse du 999Club<br />
              - Burn 15 pions  de la couleurs adverses acheté sur le marché secondaire<br />
              - Avoir une autre adresse du 999Club  pour stacker la dame que vous allez recevoir.<br />
              La tour  reçoit  22.5% des frais de transactions.<br />
              - Taxe sur la vente: 16% (50% holders | 50% Cagnotte)<br />
              - Taxe sur le Burn: 35% (50% holders et 50%  Cagnotte)<br />
              La dame à un droit de vote sur les achats et ventes de chiffres de la cagnotte.
            </div>
            <div className="contentBanner">
              <img src={bannerQueen} />
            </div>
          </div>
        </div>
      </div>
      <div className="text-content">
        <div>
          <div className="retweet">
            <img src={retweet} className="retweetImg" />You have retweeted
          </div>
        </div>
        <div className="flex">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
          </div>
          <div>
            <div className="title">
              Number Runner Club <sup>v1/</sup> <span className="account">@TheNRClub</span>
            </div>
            <div className="description">
              Seul les détenteurs du 999Club et du 10Kclub ont accès à la cagnotte finale. *<br />
              *Deux possibilités pour les détenteurs du 100Kclub d’avoir accès a la cagnotte :<br />
              - Acheter un chiffre du 10Kclub avec sa cagnotte personnel<br />
              - Hold un chiffre du 10Kclub ou 999club en cours de route
            </div>
            <div className="contentBanner">
              <img src={tableau} />
            </div>
          </div>
        </div>
      </div>
      <div className="text-content">
        <div className="flex">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
            <div className="barreOblique"></div>
          </div>
          <div>
            <div className="title">
              Number Runner Club <sup>v1/</sup> <span className="account">@TheNRClub</span><br />
            </div>
            <div className="description">
              <div className="contentBanner contentBannerFaq">
                <img src={faqGif} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flexMargin">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
            <div className="barreOblique"></div>
          </div>
          <div>
            <div className="title">
              Number Runner Club <sup>v1/</sup> <span className="account">@TheNRClub</span><br />
            </div>
            <div className="description">
              <strong>Combien coûte le mint d’un Number Runner ?</strong><br /><br />
              Le mint d’un Number Runner est à 0,2 eth :<br />
              - 0,1 eth est redistribué aux holders.<br />
              - 0,1 eth pour la team
            </div>
          </div>
        </div>
        <div className="flex flexMargin">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
            <div className="barreOblique"></div>
          </div>
          <div>
            <div className="title">
              Number Runner Club <sup>v1/</sup> <span className="account">@TheNRClub</span>
            </div>
            <div className="description">
              <strong>Pourquoi ne pas avoir opté pour un freemint ?</strong><br /><br />
              Le Number Runner Club veut récompenser les earlys détenteurs et ceux qui portent le projet.<br />
              Le Number Runner Club V1 ne reçoit pas de royalties sur les ventes de NFTs, le mint est donc indispensable pour soutenir le projet et pouvoir construire.
            </div>
          </div>
        </div>
        <div className="flex flexMargin">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
            <div className="barreOblique"></div>
          </div>
          <div>
            <div className="title">
              Number Runner Club <sup>v1/</sup> <span className="account">@TheNRClub</span>
            </div>
            <div className="description">
              <strong>Comment Stacker mon Number Runner ?</strong><br /><br />
              Rendez-vous sur l’onglet mon profil et laissez vous guider.
            </div>
          </div>
        </div>
        <div className="flex flexMargin">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
            <div className="barreOblique"></div>
          </div>
          <div>
            <div className="title">
              Number Runner Club <sup>v1/</sup> <span className="account">@TheNRClub</span>
            </div>
            <div className="description">
              <strong>Que se passera t il une fois qu’il ne reste plus 999 Number Runner en circulation ?</strong><br /><br />
              Lorsque la collection aura atteint 999 Number Runner en circulation, les détenteurs pourront retirer leurs récompenses sans taxes.<br />
              Une nouvelle version du Number Runner Club sera lancé, les détenteurs pourrons échanger leurs NFTs contre un nouveau pass qui leurs donnes des parts du nouveau projet à hauteur des ETH qu’ils auront accumulé. Les détenteurs peuvent choisir de récupérer leurs parts de la cagnotte general mais en payant une taxe de 35%.
            </div>
          </div>
        </div>
        <div className="flex flexMargin">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
          </div>
          <div>
            <div className="title">
              Number Runner Club <sup>v1/</sup> <span className="account">@TheNRClub</span>
            </div>
            <div className="description">
              <strong>Comment est calculé le montant de redistribution de la cagnotte général ?</strong><br /><br />
              Le montant de votre redistribution est calculé par rapport à vos NFTs et son niveau de rareté mais prend aussi en compte le temps que vous avez stacker pour arriver au 999 NFTs en circulation.
            </div>
          </div>
        </div>
      </div>
      <div className="text-content">
        <div className="flex">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
          </div>
          <div>
            <div className="title">
              Number Runner Club <sup>v1/</sup> <span className="account">@TheNRClub</span>
            </div>
            <div className="description">
              Vous pouvez consulter le smart-contact via ce lien : <a href="https://etherscan.io/" target="_blank">Smart Contract</a>
            </div>
            <div className="contentBanner">
              <img src={contrat} />
            </div>
          </div>
        </div>
      </div>
      <div className="text-content">
        <div className="flex">
          <div className="contentLogo">
            <div className="logo">
              <img src={logo} className="logoImg"/>
            </div>
          </div>
          <div>
            <div className="title">
              Number Runner Club <sup>v1/</sup> <span className="account">@TheNRClub</span>
            </div>
            <div className="description">
              Discords alternative
              <br /><br />
              Construisons ensemble la plus grande communautés web3 sur NFTYCHAT.<br />
              Pas de nom d’utilisateur ou de mot de passe requis. Connectez vous avec votre portefeuille !<br />
              Les salons ne sont accessible seulement si vous holders de Number Runner Club.
            </div>
            <div className="contentBanner">
              <img src={discord} />
            </div>
          </div>
        </div>
      </div>
    </AboutStyleWrapper>
  );
};

export default About;
