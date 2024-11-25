import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { Segment, Button, Icon } from 'semantic-ui-react';
import { ThemeProvider } from 'styled-components';
import user1 from './eflogo.png'
import user2 from './user_12533276.png'

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#1E6FD9',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#BDD9F2',
  botFontColor: 'black',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};
const responses = {
   compris : 'veillez contactez notre service client via ce numero 56558402.',
  panne: 'Pour les pannes, vérifiez les connexions des capteurs et redémarrez les appareils concernés.',
  optimisation: 'Pour optimiser votre consommation, vous pouvez réduire les appareils en veille et utiliser des équipements énergétiques efficaces.',
  facture: 'Pour comprendre votre facture, vérifiez les sections coût de consommation, taxes, et autres contributions.',
  installation: 'Pour installer de nouveaux capteurs, suivez les instructions du manuel ou contactez le support technique.',
  maintenance: 'Pour la maintenance, assurez-vous de suivre le calendrier recommandé pour les vérifications et les nettoyages des équipements.',
  compatibilité: 'Pour vérifier la compatibilité des équipements, consultez la documentation des produits ou contactez le fabricant.',
  coût: 'Pour obtenir des informations sur les coûts, veuillez consulter la section des tarifs ou contacter notre service client.',
  horaires: 'Nos horaires d\'ouverture sont de 9h à 18h du lundi au vendredi.',
  support: 'Pour contacter le support, envoyez un e-mail à support@example.com ou appelez le 123-456-7890.',
  garantie: 'Les garanties varient selon les produits. Consultez la documentation du produit pour plus d\'informations.',
  retour: 'Pour retourner un produit, veuillez consulter notre politique de retour sur notre site web ou contacter le support.',
  remboursement: 'Les remboursements sont traités dans un délai de 14 jours après réception du produit retourné.',
  installation_difficile: 'Si vous avez des difficultés avec l\'installation, consultez le guide de l\'utilisateur ou contactez notre support.',
  mise_a_jour: 'Pour les mises à jour logicielles, vérifiez la section des mises à jour sur notre site ou contactez le support.',
  sécurité: 'Nous recommandons d\'utiliser des mots de passe forts et de maintenir vos logiciels à jour pour garantir la sécurité.',
  réseau: 'Si vous rencontrez des problèmes de réseau, vérifiez les connexions et redémarrez votre routeur.',
  configuration: 'Pour configurer vos appareils, suivez les instructions fournies dans le manuel ou contactez le support.',
  calibration: 'Assurez-vous que vos capteurs sont correctement calibrés en suivant les instructions du manuel.',
  performance: 'Pour améliorer la performance, vérifiez les paramètres et assurez-vous que vos appareils sont bien entretenus.',
  installation_capteur: 'Pour l\'installation des capteurs, suivez le guide d\'installation fourni avec le produit.',
  mise_a_niveau: 'Pour mettre à niveau votre système, consultez notre site web pour les options disponibles.',
  connexion: 'Vérifiez que tous les câbles sont correctement connectés et que les appareils sont allumés.',
  compatibilité_logiciel: 'Assurez-vous que votre logiciel est compatible avec votre système en consultant la documentation.',
  problèmes_connexion: 'Si vous rencontrez des problèmes de connexion, vérifiez les paramètres de votre réseau et essayez de redémarrer les appareils.',
  alarme: 'Si une alarme se déclenche, vérifiez les capteurs et assurez-vous qu\'il n\'y a pas de fausse alarme.',
  analyse: 'Pour une analyse approfondie, utilisez les outils d\'analyse fournis ou consultez notre documentation.',
  capteur_défectueux: 'Si vous suspectez un capteur défectueux, contactez le support technique pour obtenir une assistance.',
  données: 'Les données collectées peuvent être consultées via notre tableau de bord ou en contactant le support.',
  calibrage: 'Pour calibrer vos appareils, suivez les instructions de calibrage fournies dans le manuel.',
  suivi: 'Pour le suivi de vos commandes, consultez votre compte client ou contactez notre support.',
  produit_disponible: 'Pour savoir si un produit est disponible, consultez notre site web ou contactez notre service client.',
  assistance: 'Pour toute assistance supplémentaire, contactez notre support technique par e-mail ou téléphone.',
  sécurité_équipements: 'Assurez-vous que vos équipements sont sécurisés en suivant les recommandations de sécurité dans la documentation.',
  problème_logiciel: 'Si vous rencontrez un problème logiciel, essayez de redémarrer l\'application et vérifiez les mises à jour disponibles.',
  documentation: 'La documentation complète est disponible sur notre site web ou peut être demandée au support.',
  mise_en_service: 'Pour la mise en service de nouveaux équipements, suivez les instructions fournies dans le manuel.',
  rapport: 'Pour générer un rapport, utilisez notre outil de reporting en ligne ou contactez notre support.',
  interface: 'Pour des questions sur l\'interface, consultez le guide utilisateur ou contactez le support technique.',
  configuration_avancée: 'Pour la configuration avancée, consultez notre documentation ou demandez de l\'aide au support.',
  mise_a_jour_firmware: 'Pour mettre à jour le firmware, suivez les instructions disponibles dans la section des mises à jour sur notre site.',
  dépannage_commun: 'Pour les problèmes courants, consultez notre guide de dépannage en ligne.',
  nettoyage: 'Pour le nettoyage, suivez les instructions de nettoyage fournies avec l\'équipement.',
  consommation: 'Pour suivre votre consommation d\'énergie, consultez les graphiques et rapports disponibles dans votre tableau de bord.',
  mise_en_reseau: 'Pour la mise en réseau de vos équipements, suivez les instructions de configuration réseau dans le manuel.',
  service_client: 'Pour toute question, notre service client est disponible par e-mail ou téléphone.',
  assistance_technique: 'Notre assistance technique est disponible pour résoudre vos problèmes techniques via e-mail ou téléphone.',
  vérification: 'Pour vérifier l\'état de vos équipements, utilisez les outils de diagnostic fournis.',
  rapport_technique: 'Les rapports techniques sont disponibles sur demande auprès de notre support.',
  configuration_initiale: 'Pour la configuration initiale, suivez les étapes décrites dans le guide d\'installation.',
  compatibilité_système: 'Vérifiez la compatibilité de votre système avec nos produits en consultant la documentation.',
  équipement_défaut: 'Si vous rencontrez un défaut d\'équipement, contactez notre support pour obtenir une assistance.',
  service_maintenance: 'Pour le service de maintenance, suivez les recommandations du manuel ou contactez notre service client.',
  état_équipement: 'Pour vérifier l\'état de vos équipements, consultez les indicateurs de statut sur le panneau de contrôle.',
  installation_logiciel: 'Pour l\'installation du logiciel, suivez les instructions fournies dans le guide d\'installation.',
  mise_a_jour_logiciel: 'Pour mettre à jour le logiciel, vérifiez les mises à jour disponibles sur notre site web.',
  réglages: 'Pour ajuster les réglages, consultez le manuel utilisateur ou contactez notre support.',
  rapports_de_consommation: 'Les rapports de consommation peuvent être consultés dans la section des rapports de votre compte.',
  configuration_système: 'Pour configurer votre système, suivez les instructions du manuel ou demandez de l\'aide au support.',
  mise_a_niveau_système: 'Pour la mise à niveau du système, consultez notre site pour les options disponibles.',
  dépannage_système: 'Pour le dépannage du système, utilisez le guide de dépannage fourni ou contactez le support.',
  optimisation_performance: 'Pour optimiser la performance, assurez-vous que le système est bien configuré et entretenu.',
  installation_accessoires: 'Pour l\'installation des accessoires, suivez les instructions fournies avec les accessoires.',
  vérification_réseau: 'Pour vérifier les paramètres réseau, consultez la documentation de votre routeur ou contactez le support.',
  résolution_problèmes: 'Pour résoudre les problèmes, consultez notre guide de résolution des problèmes ou contactez le support.',
  aide_en_ligne: 'Pour obtenir de l\'aide en ligne, consultez notre centre d\'aide disponible sur notre site web.',
  paramétrage: 'Pour paramétrer vos équipements, suivez les instructions fournies dans le guide de l\'utilisateur.',
  vérification_capteur: 'Pour vérifier le fonctionnement des capteurs, consultez les outils de diagnostic disponibles.',
  dépannage_accessoires: 'Pour dépanner les accessoires, vérifiez les connexions et consultez le guide de dépannage.',
  mise_a_niveau_logiciel: 'Pour mettre à niveau le logiciel, suivez les instructions disponibles sur notre site web.',
  assistance_client: 'Pour obtenir de l\'assistance client, contactez-nous par e-mail ou téléphone.',
  gestion_énergie: 'Pour gérer votre consommation d\'énergie, consultez les outils de gestion disponibles dans votre tableau de bord.',
  installation_composants: 'Pour installer des composants supplémentaires, suivez les instructions fournies dans le manuel.',
  calibration_équipements: 'Pour calibrer vos équipements, utilisez les outils de calibration fournis dans le kit.',
  dépannage_faible_performance: 'Pour résoudre les problèmes de faible performance, consultez le guide de dépannage ou contactez le support.',
  mise_en_service_capteurs: 'Pour mettre en service les capteurs, suivez les instructions fournies dans le guide d\'installation.',
  vérification_compatibilité: 'Pour vérifier la compatibilité des produits, consultez la documentation ou contactez le fabricant.',
  assistance_technique_urgente: 'Pour une assistance technique urgente, contactez notre support par téléphone.',
  installation_système: 'Pour l\'installation du système, suivez les instructions du guide d\'installation fourni.',
  vérification_performance: 'Pour vérifier la performance, utilisez les outils de diagnostic et consultez les rapports de performance.',
  dépannage_équipement: 'Pour dépanner l\'équipement, suivez les étapes de dépannage fournies dans le guide.',
  configuration_avancée_système: 'Pour la configuration avancée, consultez la documentation technique ou contactez le support.',
  mise_a_niveau_composants: 'Pour mettre à niveau les composants, consultez notre site web pour les options disponibles.',
  gestion_de_l_énergie: 'Pour la gestion de l\'énergie, utilisez les outils de gestion disponibles dans votre tableau de bord.',
  installation_module: 'Pour installer le module, suivez les instructions fournies dans le manuel.',
  vérification_équipement: 'Pour vérifier l\'équipement, utilisez les outils de diagnostic disponibles dans votre système.',
  assistance_en_ligne: 'Pour obtenir de l\'assistance en ligne, consultez notre centre d\'aide sur notre site web.',
  configuration_des_appareils: 'Pour configurer les appareils, suivez les instructions fournies dans le guide de l\'utilisateur.',
  dépannage_défaut: 'Pour dépanner les défauts, consultez le guide de dépannage ou contactez notre support.',
  mise_a_jour_des_appareils: 'Pour mettre à jour les appareils, vérifiez les mises à jour disponibles sur notre site.',
  vérification_de_la_configuration: 'Pour vérifier la configuration, consultez les paramètres dans le système ou contactez le support.',
  optimisation_des_capteurs: 'Pour optimiser les capteurs, consultez le guide d\'utilisation et effectuez les ajustements nécessaires.',
  installation_détecteurs: 'Pour l\'installation des détecteurs, suivez les instructions fournies dans le guide d\'installation.',
  assistance_technique_dépannage: 'Pour une assistance technique en dépannage, contactez notre support technique.',
  vérification_du_réseau: 'Pour vérifier le réseau, consultez les paramètres réseau et assurez-vous que tout est correctement configuré.',
  configuration_des_systèmes: 'Pour configurer les systèmes, suivez les instructions fournies dans la documentation.',
  mise_a_jour_des_systèmes: 'Pour mettre à jour les systèmes, vérifiez les mises à jour disponibles sur notre site.',
  dépannage_du_système: 'Pour dépanner le système, suivez le guide de dépannage ou contactez notre support.',
  gestion_des_risques: 'Pour gérer les risques, consultez notre guide sur la gestion des risques ou contactez le support.',
  configuration_de_l_interface: 'Pour configurer l\'interface, suivez les instructions fournies dans le guide de l\'utilisateur.',
  vérification_de_la_sécurité: 'Pour vérifier la sécurité, consultez les paramètres de sécurité disponibles dans le système.',
  assistance_en_direct: 'Pour une assistance en direct, contactez notre support par téléphone ou chat en direct.',
  installation_rapide: 'Pour une installation rapide, suivez les instructions simplifiées fournies dans le guide.',
  dépannage_rapide: 'Pour un dépannage rapide, consultez les solutions aux problèmes courants disponibles dans notre guide.',
  configuration_personnalisée: 'Pour une configuration personnalisée, consultez notre documentation ou demandez de l\'aide au support.',
  vérification_des_recommandations: 'Pour vérifier les recommandations, consultez les guides disponibles ou contactez notre support.',
  assistance_par_email: 'Pour obtenir de l\'assistance par e-mail, envoyez-nous un message à support@example.com.',
  gestion_de_la_performance: 'Pour gérer la performance, utilisez les outils d\'analyse disponibles dans votre système.',
  dépannage_des_capteurs: 'Pour dépanner les capteurs, vérifiez les connexions et suivez les instructions du guide.',
  installation_des_capteurs: 'Pour installer les capteurs, suivez les instructions fournies dans le manuel.',
  optimisation_du_système: 'Pour optimiser le système, assurez-vous que toutes les configurations sont correctement appliquées.',
  vérification_des_options: 'Pour vérifier les options disponibles, consultez notre site web ou contactez le support.',
  assistance_technique_en_ligne: 'Pour une assistance technique en ligne, consultez notre centre d\'aide sur le site web.',
  configuration_des_capteurs: 'Pour configurer les capteurs, suivez les instructions du guide d\'utilisateur.',
  dépannage_des_problèmes: 'Pour dépanner les problèmes, consultez notre guide de dépannage ou contactez le support.',
  mise_a_jour_des_problèmes: 'Pour mettre à jour les problèmes, vérifiez les options disponibles dans la section des mises à jour.'
};

const getResponse = (question) => {
  const lowerQuestion = (question || '').toLowerCase();
  console.log('Received question:', lowerQuestion);
  for (const [key, response] of Object.entries(responses)) {
    if (lowerQuestion.includes(key)) {
      return response;
    }}
  return 'Je n\'ai pas compris votre question. Pouvez-vous reformuler ?';
};

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      id: 'Greet',
      message: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
      trigger: 'askhelp',
    },
    {
      id: 'askhelp',
      message: 'Dites-moi en quoi je peux vous assister.',
      trigger: 'waiting1',
    },
    {
      id: 'waiting1',
      user: true,
      trigger: 'answer',
    },
    {
      id: 'answer',
      message: ({ previousValue }) => {
        console.log('User question:', previousValue);
        return getResponse(previousValue);
      },
      trigger: 'askMore',
    },
    {
      id: 'askMore',
      message: 'Puis-je vous aider avec autre chose ?',
      trigger: 'waiting2',
    },
    {
      id: 'waiting2',
      user: true,
      trigger: ({ value }) => {
        const lowerValue = value.toLowerCase();
        if (lowerValue.includes('non') || lowerValue.includes('merci')) {
          return 'endMessage';
        }
        return 'answer';
      },
    },
    {
      id: 'endMessage',
      message: 'Merci pour votre visite ! Passez une excellente journée !',
      end: true,
    },
  ];

  return (
    <>
        <Button
          icon
          onClick={() => setIsOpen(!isOpen)}
          color="black"
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '20px',
            border: 'solid',
            borderRadius: '6px',
            width: '150px',
            height: '50px',
            zIndex: 1001,
          }}
        >
          <Icon name="chat" /> ChatBot
        </Button>
*
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            zIndex: 1000,
            border: 'solid',
            borderColor: 'black',
            borderWidth: '1px',
            borderRadius: '6px',
          }}
        >
            <ThemeProvider theme={theme}>

          <ChatBot
            steps={steps}
            
            botAvatar={user1}
            userAvatar={user2}
            headerTitle="Energy Flow ChatBot"
           
            contentStyle={{
              backgroundColor: '#f4f4f4',
              padding: '20px',
            }}
           
          />
          </ThemeProvider>
        </div>
      )}
    </>
  );
};

export default ChatbotButton;
