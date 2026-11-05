import { SupportedLanguage } from './types';
import {
  LogisticsProduct,
  WorkflowStep,
  WhyChooseUsItem,
  ImpactStat,
  ClientTestimonial,
  BlogArticle,
  LegalDocument,
  LegalDocKey,
  LOGISTICS_PRODUCTS,
  SIX_CORE_OPERATIONS,
  HOW_IT_WORKS_STEPS,
  WHY_CHOOSE_US,
  IMPACT_STATS,
  TESTIMONIALS,
  BLOG_ARTICLES,
  LEGAL_DOCUMENTS,
} from '../data/companyData';

export interface LocalizedCoreOperation {
  code: string;
  title: string;
  detail: string;
}

// Helper to provide localized versions of products
export function getLocalizedProducts(lang: SupportedLanguage): LogisticsProduct[] {
  if (lang === 'es') return LOGISTICS_PRODUCTS;

  return LOGISTICS_PRODUCTS.map((prod) => {
    if (prod.id === 'prod-alm-paletizado') {
      if (lang === 'ca') {
        return {
          ...prod,
          title: 'Custòdia Paletitzada Multiclient i Dipòsit Duaner Flexible',
          shortCategory: 'Emmagatzematge Estàtic i Règim Duaner',
          definition:
            'Servei tècnic de recepció en moll, desconsolidació de contenidor FCL/LCL i emmagatzematge en prestatgeria selectiva per a unitats de càrrega paletitzades estàndard europeu (EUR-EPAL 1.200 × 800 mm) i industrial (1.200 × 1.000 mm). Habilitat per a mercaderia de lliure pràctica UE i mercaderia no comunitària sota règim suspensiu de Magatzem de Dipòsit Temporal (ADT) i Dipòsit Distint del Duaner (DDA).',
          keyTechnicalFeatures: [
            'Gestió d’ubicacions caòtica dirigida per SGA (WMS) segons anàlisi de rotació ABC i criteris estrictes FIFO (First In, First Out) i FEFO (control de caducitat i lot).',
            'Identificació unívoca d’unitats de càrrega mitjançant etiqueta logística estàndard GS1-128 amb codi seriat de contenidor d’enviament (SSCC de 18 dígits).',
            'Suspensió de la meritació de drets aranzelaris d’importació i IVA (Reglament UE 952/2013 CAU) fins al despatx a lliure pràctica (DUA) o reexportació.',
            'Descàrrega i verificació física de mercaderia contenidoritzada amb emissió de comunicat d’incidències o reserves en CMR / Bill of Lading en menys de 4 hores.',
          ],
          specTable: [
            { label: 'Unitat de càrrega admesa', value: 'EUR-EPAL (1200×800 mm) / FIN (1200×1000 mm)' },
            { label: 'Capacitat màxima per buit', value: '1.200 kg pes brut · Alçària màx. 1.850 mm' },
            { label: 'Traçabilitat i inventari', value: 'GS1-128 (SSCC) · Fiabilitat auditada 99,84%' },
            { label: 'Règim fiscal / duaner', value: 'Nacional UE · ADT (90 dies) · DDA il·limitat' },
            { label: 'Condició ambiental i seguretat', value: '15 °C – 25 °C sec · PCI ESFR · TAPA FSR' },
          ],
          tariffUnit: 'per buit de palet / mes + manipulació E/S',
        };
      }
      if (lang === 'en') {
        return {
          ...prod,
          title: 'Multi-Client Palletized Storage & Flexible Bonded Warehouse',
          shortCategory: 'Static Warehousing & Bonded Regimes',
          definition:
            'Dock receiving, FCL/LCL container devanning, and selective rack storage for standard European (EUR-EPAL 1,200 × 800 mm) and industrial pallets (1,200 × 1,000 mm). Fully authorized for EU free-circulation goods and non-EU shipments under Temporary Storage Facility (ADT) and Customs Bonded Warehouse (DDA) suspension regimes.',
          keyTechnicalFeatures: [
            'WMS-directed chaotic slotting optimized by ABC velocity analysis, strictly enforcing FIFO (First In, First Out) and FEFO (batch/expiry date) rotation.',
            'Unique pallet load identification via standardized GS1-128 logistics barcoding with 18-digit Serial Shipping Container Codes (SSCC).',
            'Full suspension of import customs duties and VAT (EU Reg. 952/2013 UCC) until customs clearance for free circulation or re-exportation.',
            'Container destuffing and tally verification with damage reports or CMR / Bill of Lading clauses logged in under 4 hours.',
          ],
          specTable: [
            { label: 'Accepted load unit', value: 'EUR-EPAL (1200×800 mm) / FIN (1200×1000 mm)' },
            { label: 'Max capacity per slot', value: '1,200 kg gross weight · Max height 1,850 mm' },
            { label: 'Traceability & inventory', value: 'GS1-128 (SSCC) · 99.84% audited accuracy' },
            { label: 'Customs / tax regime', value: 'EU Free / ADT (90 days) / Unlimited DDA' },
            { label: 'Environment & safety', value: '15 °C – 25 °C dry · ESFR Sprinklers · TAPA FSR' },
          ],
          tariffUnit: 'per pallet slot / month + handling in/out',
        };
      }
      if (lang === 'fr') {
        return {
          ...prod,
          title: 'Stockage Palettisé Multi-Clients et Entrepôt Sous Douane Flexible',
          shortCategory: 'Entreposage Statique et Régimes Douaniers',
          definition:
            'Réception à quai, dépotage de conteneurs FCL/LCL et stockage en rayonnages sélectifs pour palettes standard Europe (EUR-EPAL 1.200 × 800 mm) et industrielles (1.200 × 1.000 mm). Habilité pour marchandises communautaires et cargaisons sous régime suspensif de Magasin de Dépôt Temporaire (ADT) et Entrepôt Sous Douane (DDA).',
          keyTechnicalFeatures: [
            'Gestion d’emplacements pilotée par WMS selon l’analyse ABC avec rotation stricte FIFO et FEFO (contrôle des lots et dates de péremption).',
            'Identification unitaire des palettes par étiquette logistique GS1-128 avec code SSCC international à 18 chiffres.',
            'Suspension des droits de douane et de la TVA à l’importation (Règlement UE 952/2013 CDU) jusqu’à la mise en libre pratique ou réexportation.',
            'Déchargement et pointage physique des conteneurs avec émission de réserves CMR / Bill of Lading en moins de 4 heures.',
          ],
          specTable: [
            { label: 'Unité de charge admise', value: 'EUR-EPAL (1200×800 mm) / FIN (1200×1000 mm)' },
            { label: 'Capacité maximale par alvéole', value: '1.200 kg brut · Hauteur max. 1.850 mm' },
            { label: 'Traçabilité et inventaire', value: 'GS1-128 (SSCC) · Fiabilité auditée 99,84%' },
            { label: 'Régime douanier', value: 'Union UE · ADT (90 j) · DDA illimité' },
            { label: 'Conditions et sécurité', value: '15 °C – 25 °C sec · Sprinklers ESFR · TAPA FSR' },
          ],
          tariffUnit: 'par emplacement palette / mois + manutention E/S',
        };
      }
      if (lang === 'de') {
        return {
          ...prod,
          title: 'Multi-Client Palettenlagerung und Flexibles Zolllager',
          shortCategory: 'Statische Lagerung und Zollverfahren',
          definition:
            'Rampen-Wareneingang, Entladung von FCL/LCL-Containern und selektive Hochregallagerung für Europaletten (EUR-EPAL 1.200 × 800 mm) und Industriepaletten (1.200 × 1.000 mm). Zugelassen für EU-Freiverkehrsware sowie Drittlandsware im Zolllagerverfahren (ADT / DDA).',
          keyTechnicalFeatures: [
            'WMS-geführte chaotische Lagerplatzverwaltung nach ABC-Umschlagsanalyse und strengem FIFO/FEFO-Prinzip (Chargen- und Mindesthaltbarkeitskontrolle).',
            'Eindeutige Palettenkennzeichnung über standardisierte GS1-128-Logistiketiketten mit 18-stelligem SSCC-Code.',
            'Aussetzung der Einfuhrzölle und Einfuhrumsatzsteuer (EU-Verordnung 952/2013 UZK) bis zur Überlassung in den zollrechtlich freien Verkehr oder Wiederausfuhr.',
            'Entladung und physische Kontrolle mit Erstellung von CMR-/Konnossement-Vorbehaltsprotokollen binnen 4 Stunden.',
          ],
          specTable: [
            { label: 'Zugelassene Ladeeinheit', value: 'EUR-EPAL (1200×800 mm) / FIN (1200×1000 mm)' },
            { label: 'Maximale Traglast / Fach', value: '1.200 kg brutto · Max. Höhe 1.850 mm' },
            { label: 'Rückverfolgbarkeit', value: 'GS1-128 (SSCC) · 99,84% Bestandsgenauigkeit' },
            { label: 'Zollrechtlicher Status', value: 'EU-Freiverkehr · ADT (90 Tage) · DDA unbefristet' },
            { label: 'Sicherheit & Umwelt', value: '15 °C – 25 °C trocken · ESFR-Sprinkler · TAPA FSR' },
          ],
          tariffUnit: 'pro Palettenstellplatz / Monat + Ein-/Auslagerung',
        };
      }
      if (lang === 'it') {
        return {
          ...prod,
          title: 'Stoccaggio Pallettizzato Multi-Cliente e Deposito Doganale Flessibile',
          shortCategory: 'Stoccaggio Statico e Regimi Doganali',
          definition:
            'Ricevimento a banchina, svuotamento container FCL/LCL e stoccaggio in scaffalature selettive per europallet (EUR-EPAL 1.200 × 800 mm) e pallet industriali (1.200 × 1.000 mm). Autorizzato per merci in libera pratica UE e merci non comunitarie sotto regime sospensivo doganale (ADT / DDA).',
          keyTechnicalFeatures: [
            'Gestione dinamica delle ubicazioni guidata da WMS secondo analisi ABC e rotazione FIFO/FEFO (controllo lotti e scadenze).',
            'Identificazione univoca dell’unità di carico tramite etichetta logistica GS1-128 con codice SSCC a 18 cifre.',
            'Sospensione di dazi doganali e IVA all’importazione (Regolamento UE 952/2013 CDU) fino allo sdoganamento o alla riesportazione.',
            'Scarico e controllo con contestazione riserve CMR / Bill of Lading in meno di 4 ore.',
          ],
          specTable: [
            { label: 'Unità di carico ammessa', value: 'EUR-EPAL (1200×800 mm) / FIN (1200×1000 mm)' },
            { label: 'Portata massima per posto', value: '1.200 kg lordi · Altezza max 1.850 mm' },
            { label: 'Tracciabilità e inventario', value: 'GS1-128 (SSCC) · 99,84% precisione auditata' },
            { label: 'Regime doganale / fiscale', value: 'UE / ADT (90 gg) / DDA illimitato' },
            { label: 'Sicurezza e ambiente', value: '15 °C – 25 °C asciutto · Sprinkler ESFR · TAPA FSR' },
          ],
          tariffUnit: 'per posto pallet / mese + movimentazione E/U',
        };
      }
    }

    if (prod.id === 'prod-fulfillment-rf') {
      if (lang === 'ca') {
        return {
          ...prod,
          title: 'Fulfillment E-Commerce Omnicanal i Picking Unitari per Radiofreqüència',
          shortCategory: 'Preparació de Comandes (Pick & Pack) i Control d’Estoc',
          definition:
            'Operativa de preparació de comandes d’alta freqüència per a botigues online (B2C) i reposició retail (B2B) mitjançant extracció per onades (wave picking) i agrupació multireferència (batch picking) guiada per terminals RF. Inclou sincronització d’estoc en temps real, verificació ponderal i volumètrica, condicionament protector sostenible i emissió automàtica de documentació d’expedició.',
          keyTechnicalFeatures: [
            'Integració bidireccional via API REST i missatgeria EDI (ORDERS, DESADV, INVRPT) amb Shopify, WooCommerce, PrestaShop, Amazon Seller i sistemes ERP.',
            'Doble lectura òptica de codi EAN-13 / GTIN-14 a la ubicació carton-flow i a la taula de packing, reduint la taxa de discrepància per sota del 0,16%.',
            'Optimització de l’embalatge mitjançant cartó corrugat canal doble ECT-32 certificat FSC, minimitzant el pes volumètric tarifable en transport urgent.',
            'Operacions de valor afegit (VAS): kitting promocional, enfaxat, etiquetatge comercial multilingüe i emissió d’albarà cec o packing list valorat.',
          ],
          specTable: [
            { label: 'Mètode d’extracció', value: 'Wave & Batch Picking per terminal RF' },
            { label: 'Sincronització d’inventari', value: 'Temps real (< 5 min) via API / Webhook' },
            { label: 'Hora de tall (Cut-off SLA)', value: '18:30 CET amb expedició el mateix dia' },
            { label: 'Control de qualitat sortida', value: 'Doble escaneig EAN + bàscula dinàmica' },
            { label: 'Ràtio d’exactitud picking', value: '99,84% de línies servides sense incidència' },
          ],
          tariffUnit: 'per comanda base preparada (1a línia incl.)',
        };
      }
      if (lang === 'en') {
        return {
          ...prod,
          title: 'Omnichannel E-Commerce Fulfillment & RF Unit-Level Picking',
          shortCategory: 'Pick & Pack Operations & Real-Time Stock Control',
          definition:
            'High-velocity order preparation for digital brands (B2C) and retail store replenishment (B2B) utilizing wave and batch picking guided by RF barcode handhelds. Encompasses real-time inventory synchronization, weight and volumetric verification, sustainable packaging, and automatic shipping document generation.',
          keyTechnicalFeatures: [
            'Two-way REST API and EDI (ORDERS, DESADV, INVRPT) integration with Shopify, WooCommerce, PrestaShop, Amazon, and corporate ERP systems.',
            'Dual barcode optical scan of EAN-13 / GTIN-14 at carton-flow pick faces and packing stations, driving discrepancy rates below 0.16%.',
            'Packaging dimensional optimization utilizing double-wall ECT-32 FSC-certified corrugated boxes, minimizing chargeable volumetric weight.',
            'Value-Added Services (VAS): promotional kitting, bundling, localized product relabeling, and customized branded packing slips.',
          ],
          specTable: [
            { label: 'Picking methodology', value: 'RF handheld Wave & Batch Picking' },
            { label: 'Inventory synchronization', value: 'Real-time (< 5 min) via API / Webhooks' },
            { label: 'Daily Cut-off SLA', value: '18:30 CET with same-day dispatch' },
            { label: 'Outbound quality control', value: 'Dual EAN scan + dynamic checkweigher' },
            { label: 'Picking accuracy ratio', value: '99.84% defect-free order lines' },
          ],
          tariffUnit: 'per base order fulfilled (1st item line incl.)',
        };
      }
      if (lang === 'fr') {
        return {
          ...prod,
          title: 'Fulfillment E-Commerce Omnicanal et Picking Unitaire par Radiofréquence',
          shortCategory: 'Préparation de Commandes (Pick & Pack) et Gestion des Stocks',
          definition:
            'Préparation de commandes à haute cadence pour boutiques en ligne (B2C) et réassort magasins (B2B) par prélèvement par vagues (wave picking) et regroupement (batch picking) guidé par radiofréquence. Comprend synchronisation des stocks en temps réel, pesée dynamique, calage éco-responsable et impression automatique des bordereaux.',
          keyTechnicalFeatures: [
            'Interfaçage API REST et messages EDI (ORDERS, DESADV, INVRPT) avec Shopify, WooCommerce, PrestaShop, Amazon et ERP.',
            'Double lecture optique EAN-13 / GTIN-14 en rayonnage dynamique et au poste d’emballage, abaissant le taux d’erreur sous 0,16%.',
            'Optimisation volumétrique des colis en carton double cannelure ECT-32 certifié FSC, réduisant le poids volumétrique taxable.',
            'Prestations à valeur ajoutée (VAS) : kitting promotionnel, fardelage, étiquetage multilingue et bordereaux personnalisés.',
          ],
          specTable: [
            { label: 'Méthode de prélèvement', value: 'Wave & Batch Picking par terminal RF' },
            { label: 'Synchronisation des stocks', value: 'Temps réel (< 5 min) par API / Webhook' },
            { label: 'Heure limite (Cut-off SLA)', value: '18:30 CET avec expédition le jour même' },
            { label: 'Contrôle qualité sortie', value: 'Double scan EAN + pesée dynamique' },
            { label: 'Taux de précision picking', value: '99,84% de lignes servies sans anomalie' },
          ],
          tariffUnit: 'par commande de base traitée (1ère ligne incl.)',
        };
      }
      if (lang === 'de') {
        return {
          ...prod,
          title: 'Omnichannel E-Commerce Fulfillment & Stückweise RF-Kommissionierung',
          shortCategory: 'Auftragskommissionierung (Pick & Pack) und Bestandsführung',
          definition:
            'Hochfrequente Auftragsabwicklung für Onlineshops (B2C) und Filialbelieferung (B2B) mittels wellen- und chargenbasierter Kommissionierung (Wave & Batch Picking) per RF-Datenterminal. Beinhaltet Bestandsabgleich in Echtzeit, dynamische Gewichtskontrolle, nachhaltiges Verpacken und automatischen Versandbelegdruck.',
          keyTechnicalFeatures: [
            'Bidirektionale REST-API- und EDI-Anbindung (ORDERS, DESADV, INVRPT) an Shopify, WooCommerce, PrestaShop, Amazon Seller und ERP-Systeme.',
            'Zweifache optische EAN-13 / GTIN-14 Barcodeerfassung am Durchlaufregal und am Packplatz, wodurch die Fehlerquote unter 0,16% sinkt.',
            'Volumenoptimierung mittels FSC-zertifizierter doppelwelliger Kartonagen (ECT-32) zur Senkung frachtpflichtiger Volumengewichte.',
            'Value-Added Services (VAS): Aktions-Kitting, Banderolieren, länderspezifische Kennzeichnung und neutrale Lieferscheine.',
          ],
          specTable: [
            { label: 'Kommissioniermethode', value: 'RF-gestütztes Wave & Batch Picking' },
            { label: 'Bestandssynchronisation', value: 'Echtzeit (< 5 Min.) via API / Webhook' },
            { label: 'Cut-off SLA Annahmeschluss', value: '18:30 CET mit Versand am gleichen Tag' },
            { label: 'Warenausgangsprüfung', value: 'Doppelter EAN-Scan + dynamische Waage' },
            { label: 'Pick-Genauigkeitsquote', value: '99,84% fehlerfreie Auftragspositionen' },
          ],
          tariffUnit: 'pro kommissioniertem Basisauftrag (inkl. 1. Zeile)',
        };
      }
      if (lang === 'it') {
        return {
          ...prod,
          title: 'Fulfillment E-Commerce Omnicanale e Picking Unitario a Radiofrequenza',
          shortCategory: 'Preparazione Ordini (Pick & Pack) e Controllo Giacenze',
          definition:
            'Gestione operativa ordini ad alta rotazione per e-commerce (B2C) e rifornimento retail (B2B) tramite wave e batch picking guidati da terminali RF. Include sincronizzazione stock in tempo reale, verifica ponderale e volumetrica, imballaggio sostenibile ed emissione automatizzata della documentazione di trasporto.',
          keyTechnicalFeatures: [
            'Integrazione bidirezionale API REST ed EDI (ORDERS, DESADV, INVRPT) con Shopify, WooCommerce, PrestaShop, Amazon ed ERP.',
            'Doppia scansione ottica EAN-13 / GTIN-14 su scaffali dinamici e tavoli di packing, riducendo le discrepanze sotto lo 0,16%.',
            'Ottimizzazione volumetrica con scatole in cartone riciclabile certificato FSC ECT-32, minimizzando il peso tassabile nei corrieri espressi.',
            'Servizi a valore aggiunto (VAS): kitting promozionale, etichettatura multilingue e ddt/packing list personalizzati.',
          ],
          specTable: [
            { label: 'Metodo di prelievo', value: 'Wave & Batch Picking con terminale RF' },
            { label: 'Sincronizzazione inventario', value: 'Tempo reale (< 5 min) via API / Webhook' },
            { label: 'Orario di Cut-off SLA', value: '18:30 CET con spedizione in giornata' },
            { label: 'Controllo qualità in uscita', value: 'Doppia lettura EAN + bilancia dinamica' },
            { label: 'Indice di accuratezza', value: '99,84% righe servite senza anomalie' },
          ],
          tariffUnit: 'per ordine base preparato (1a riga inclusa)',
        };
      }
    }

    if (prod.id === 'prod-distribucion-cmr-rma') {
      if (lang === 'ca') {
        return {
          ...prod,
          title: 'Distribució Capil·lar 24/48 h, Grupatge LTL i Circuit de Logística Inversa (RMA)',
          shortCategory: 'Transport Nacional, Última Milla i Devolucions',
          definition:
            'Servei de transport multimodal de distribució capil·lar B2C en 24/48 hores, paqueteria industrial i grupatge paletitzat LTL en àmbit ibèric i transfronterer UE, integrat amb un protocol de logística inversa sota autorització de retorn (RMA) per a inspecció tècnica, recondicionament i reincorporació immediata a l’estoc comercialitzable.',
          keyTechnicalFeatures: [
            'Enrutament algorítmic multi-transportista segons codi postal, perfil volumètric i nivell de servei, assolint un índex OTIF del 98,6%.',
            'Aplicació transparent de regles de taxació estàndard: factor d’estiba carretera 1 m³ = 333 kg (paqueteria express 1 m³ = 250 kg; metre lineal LTL = 1.750 kg).',
            'Plena compatibilitat documental sota regles Incoterms® 2020: lliurament en moll propi FCA (CIM Vallès / Riu Clar) o porta a porta DAP / DDP.',
            'Gestió integral de devolucions (RMA): recollida domiciliària o xarxa PUDO, peritatge de qualitat en menys de 24 h i actualització d’estoc apte.',
          ],
          specTable: [
            { label: 'Trànsit garantit SLA', value: '24 h Catalunya i capitals · 48 h Península' },
            { label: 'Factor de conversió / estiba', value: '1 m³ = 250 kg (B2C) / 333 kg (Industrial)' },
            { label: 'Marc jurídic i cobertura', value: 'Llei 15/2009 (LCTTM) · Conveni CMR UE' },
            { label: 'Comprovant de lliurament', value: 'e-POD amb geolocalització i signatura digital' },
            { label: 'Cicle de logística inversa', value: 'Triatge i alta en estoc apte en < 24 hores' },
          ],
          tariffUnit: 'per expedició nacional fins a 2 kg tarifables',
        };
      }
      if (lang === 'en') {
        return {
          ...prod,
          title: '24/48 h Last-Mile Distribution, LTL Groupage & Reverse Logistics (RMA)',
          shortCategory: 'Domestic Freight, Final Mile & Returns Management',
          definition:
            'Multimodal freight and 24/48 h domestic B2C courier distribution, industrial palletized LTL groupage across Iberia and EU cross-border routes, integrated with an RMA-driven reverse logistics circuit for technical inspection, grading, repackaging, and immediate return to saleable inventory.',
          keyTechnicalFeatures: [
            'Multi-carrier algorithmic routing engine optimized by destination postal code, volumetric footprint, and delivery speed, achieving 98.6% OTIF performance.',
            'Transparent standard rating formulas: road stowage factor 1 m³ = 333 kg (express parcels 1 m³ = 250 kg; loading meter LTL = 1,750 kg).',
            'Full documentation compliance with Incoterms® 2020: dock handover FCA (CIM Vallès / Riu Clar) or door-to-door DAP / DDP services.',
            'End-to-end RMA returns processing: doorstep collection or PUDO drop-off points, quality triage within 24 hours, and automated stock replenishment.',
          ],
          specTable: [
            { label: 'Guaranteed Transit SLA', value: '24 h Catalonia & Hubs · 48 h Iberia' },
            { label: 'Stowage conversion factor', value: '1 m³ = 250 kg (B2C) / 333 kg (Industrial)' },
            { label: 'Legal framework & cover', value: 'CMR Convention & Domestic Freight Acts' },
            { label: 'Proof of delivery', value: 'Digital e-POD with GPS coordinates & signature' },
            { label: 'Reverse logistics cycle', value: 'Inspection and restock clearance in < 24 h' },
          ],
          tariffUnit: 'per domestic parcel up to 2 kg chargeable weight',
        };
      }
      if (lang === 'fr') {
        return {
          ...prod,
          title: 'Distribution Dernier Kilomètre 24/48 h, Groupage LTL et Logistique Inverse (RMA)',
          shortCategory: 'Transport National, Dernier Kilomètre et Retours',
          definition:
            'Service de transport multimodal pour livraison express B2C en 24/48 heures, messagerie industrielle et groupage palettisé LTL en Espagne et en Europe, articulé avec une boucle de logistique inverse RMA pour expertise technique, reconditionnement et réintégration en stock vendable.',
          keyTechnicalFeatures: [
            'Routage multi-transporteurs algorithmique selon le code postal, le profil volumétrique et le délai exigé, garantissant un taux OTIF de 98,6%.',
            'Application transparente des ratios de taxation : équivalence route 1 m³ = 333 kg (colis express 1 m³ = 250 kg ; mètre linéaire = 1.750 kg).',
            'Parfaite compatibilité documentaire avec les règles Incoterms® 2020 : départ quai FCA (CIM Vallès / Riu Clar) ou rendu DAP / DDP.',
            'Gestion globale des retours (RMA) : enlèvement à domicile ou points relais, contrôle qualité sous 24 h et remise en vente immédiate.',
          ],
          specTable: [
            { label: 'Délai d’acheminement SLA', value: '24 h Catalogne · 48 h reste de la Péninsule' },
            { label: 'Rapport poids/volume', value: '1 m³ = 250 kg (B2C) / 333 kg (Industrie)' },
            { label: 'Cadre légal et garanties', value: 'Convention CMR UE & Règlement Transports' },
            { label: 'Preuve de livraison e-POD', value: 'Émargement numérique et géolocalisation' },
            { label: 'Traitement des retours RMA', value: 'Tri qualitatif et réintégration en < 24 h' },
          ],
          tariffUnit: 'par colis national jusqu’à 2 kg taxables',
        };
      }
      if (lang === 'de') {
        return {
          ...prod,
          title: '24/48 h Feinverteilung, LTL-Stückgut und Retourenlogistik (RMA)',
          shortCategory: 'Nationaler Transport, Letzte Meile und Retouren',
          definition:
            'Multimodaler Transportdienst für 24/48-Stunden-Paketzustellung (B2C), industrielle Palettenverkehre und LTL-Sammelgut in Spanien und der EU, gekoppelt mit einem professionellen RMA-Retourenkreislauf für Zustandsprüfung, Neuverpackung und sofortige Wiederaufnahme in den aktiven Verkaufskatalog.',
          keyTechnicalFeatures: [
            'Algorithmenbasierte Multi-Carrier-Routenoptimierung nach Postleitzahlen, Volumengewicht und Service-Level mit 98,6% OTIF-Performance.',
            'Transparente Frachtabrechnung nach Standard-Staufaktoren: Straßengüterverkehr 1 m³ = 333 kg (Expresspaket 1 m³ = 250 kg; Lademeter LTL = 1.750 kg).',
            'Vollständige Konformität mit Incoterms® 2020 Klauseln: Bereitstellung FCA Rampe (CIM Vallès / Riu Clar) oder Tür-zu-Tür DAP / DDP.',
            'Umfassendes Retourenmanagement (RMA): Abholung beim Kunden oder Paketshop-Netz, Begutachtung unter 24 h und Wiederverbuchung.',
          ],
          specTable: [
            { label: 'Laufzeitgarantie SLA', value: '24 h Katalonien · 48 h Iberische Halbinsel' },
            { label: 'Fracht-Umrechnungsfaktor', value: '1 m³ = 250 kg (B2C) / 333 kg (Industrie)' },
            { label: 'Rechtsrahmen und Deckung', value: 'CMR-Übereinkommen & Frachtverkehrsrecht' },
            { label: 'Elektronischer Abliefernachweis', value: 'Digitaler e-POD mit GPS-Daten und Signatur' },
            { label: 'RMA-Retourenabwicklung', value: 'Klassifizierung & Wiedereinlagerung < 24 h' },
          ],
          tariffUnit: 'pro nationaler Sendung bis 2 kg Frachtgewicht',
        };
      }
      if (lang === 'it') {
        return {
          ...prod,
          title: 'Distribuzione Capillare 24/48 h, Collettame LTL e Circuito di Logistica Inversa (RMA)',
          shortCategory: 'Trasporto Nazionale, Ultimo Miglio e Resi',
          definition:
            'Servizio di trasporto multimodale per consegne espresse B2C in 24/48 ore, spedizioni industriali e collettame pallettizzato LTL in tutta la penisola ed Europa, abbinato a una procedura di logistica inversa RMA per controllo conformità, riconfezionamento e re-immissione immediata a stock.',
          keyTechnicalFeatures: [
            'Instradamento algoritmico multi-vettore in base a CAP, peso volumetrico e SLA, con un tasso di successo OTIF del 98,6%.',
            'Trasparenza nelle tariffe volumetriche: rapporto di stivaggio stradale 1 m³ = 333 kg (pacchi espressi 1 m³ = 250 kg; metro lineare LTL = 1.750 kg).',
            'Conformità contrattuale con le regole Incoterms® 2020: consegna banchina FCA (CIM Vallès / Riu Clar) o porta a porta DAP / DDP.',
            'Gestione integrata dei resi RMA: ritiro al domicilio o presso punti di ritiro PUDO, collaudo in meno di 24 h e aggiornamento stock.',
          ],
          specTable: [
            { label: 'Transito garantito SLA', value: '24 h Catalogna · 48 h Penisola Iberica' },
            { label: 'Fattore di conversione volume', value: '1 m³ = 250 kg (B2C) / 333 kg (Industriale)' },
            { label: 'Quadro normativo', value: 'Convenzione CMR UE e Legge Trasporti' },
            { label: 'Prova di consegna digitale', value: 'e-POD con geolocalizzazione e firma' },
            { label: 'Ciclo di logistica inversa', value: 'Controllo e reintegro a stock in < 24 ore' },
          ],
          tariffUnit: 'per spedizione nazionale fino a 2 kg tassabili',
        };
      }
    }

    return prod;
  });
}

// 6 Core Operations
export function getLocalizedOperations(lang: SupportedLanguage): LocalizedCoreOperation[] {
  if (lang === 'es') return SIX_CORE_OPERATIONS;

  const translationsMap: Record<SupportedLanguage, { title: string; detail: string }[]> = {
    es: [],
    ca: [
      {
        title: 'Recepció de mercaderia',
        detail: 'Descàrrega de contenidors i palets, recompte físic, control d’albarà i etiquetatge GS1.',
      },
      {
        title: 'Emmagatzematge flexible',
        detail: 'Custòdia en prestatgeria convencional i dinàmica pagant només per ocupació real mensual.',
      },
      {
        title: 'Control d’estoc',
        detail: 'Inventari permanent en SGA connectat 24/7 amb traçabilitat per lot, sèrie i FEFO.',
      },
      {
        title: 'Preparació de comandes / Picking',
        detail: 'Extracció guiada per radiofreqüència, doble verificació EAN i embalatge sostenible.',
      },
      {
        title: 'Distribució nacional i última milla',
        detail: 'Lliuraments B2C i B2B en 24/48 h amb seguiment actiu i prova de lliurament e-POD.',
      },
      {
        title: 'Logística inversa',
        detail: 'Gestió de RMA, recollida, control de qualitat en 24 h i reintegració a l’estoc actiu.',
      },
    ],
    en: [
      {
        title: 'Cargo Inbound & Receiving',
        detail: 'Container and pallet unloading, physical piece count, ASN verification, and GS1 labeling.',
      },
      {
        title: 'Scalable Warehousing',
        detail: 'High-bay rack custody with pay-as-you-grow billing based solely on actual monthly occupancy.',
      },
      {
        title: 'Stock & Inventory Control',
        detail: 'Perpetual cloud WMS inventory with 24/7 traceability by batch, serial number, and FEFO expiry.',
      },
      {
        title: 'Order Fulfillment & Picking',
        detail: 'RF barcode-directed picking, dual EAN optical verification, and sustainable protective packaging.',
      },
      {
        title: 'Domestic & Last-Mile Delivery',
        detail: '24/48-hour B2C and B2B transit with live tracking checkpoints and digital e-POD proof of delivery.',
      },
      {
        title: 'Reverse Logistics & RMA',
        detail: 'RMA authorization, returns transit, 24-hour grading inspection, and restock reconciliation.',
      },
    ],
    fr: [
      {
        title: 'Réception des marchandises',
        detail: 'Déchargement de conteneurs et palettes, comptage physique, contrôle de bordereau et étiquetage GS1.',
      },
      {
        title: 'Entreposage modulable',
        detail: 'Stockage en rayonnages sélectifs avec facturation calculée uniquement sur l’occupation réelle.',
      },
      {
        title: 'Gestion des stocks',
        detail: 'Inventaire permanent sous WMS accessible 24/7 avec traçabilité par lot, numéro de série et FEFO.',
      },
      {
        title: 'Préparation de commandes (Picking)',
        detail: 'Prélèvement guidé par radiofréquence, double contrôle optique EAN et emballage éco-responsable.',
      },
      {
        title: 'Distribution express & dernier km',
        detail: 'Livraisons B2C et B2B en 24/48 h avec suivi d’acheminement actif et émargement digital e-POD.',
      },
      {
        title: 'Logistique des retours (RMA)',
        detail: 'Gestion des retours autorisés, diagnostic qualitatif sous 24 h et réintégration en stock.',
      },
    ],
    de: [
      {
        title: 'Warenannahme & Erfassung',
        detail: 'Entladung von Containern und LKW-Paletten, Zählkontrolle, Lieferscheinabgleich und GS1-Labeling.',
      },
      {
        title: 'Flexible Lagerhaltung',
        detail: 'Verwahrung im Hochregal mit variabler Monatsabrechnung exakt nach genutzter Palettenzahl.',
      },
      {
        title: 'Bestandskontrolle',
        detail: 'Permanente Inventur im Cloud-WMS mit lückenloser Rückverfolgbarkeit nach Charge, Serie und FEFO.',
      },
      {
        title: 'Kommissionierung & Picking',
        detail: 'RF-scannergeführter Pickvorgang, optischer Doppelcheck des EAN-Codes und nachhaltige Kartonage.',
      },
      {
        title: 'Flächendeckende Zustellung',
        detail: '24/48 h B2C- und B2B-Lieferung mit lückenloser Sendungsverfolgung und digitalem e-POD.',
      },
      {
        title: 'Retourenmanagement (RMA)',
        detail: 'RMA-Steuerung, Rücktransport, Qualitätsprüfung binnen 24 Stunden und zügige Wiedereinlagerung.',
      },
    ],
    it: [
      {
        title: 'Ricezione merci',
        detail: 'Scarico container e pallet, verifica quantitativa, controllo bolla ed etichettatura GS1.',
      },
      {
        title: 'Stoccaggio modulare',
        detail: 'Custodia in scaffalature selettive pagando solo in base all’effettiva occupazione mensile.',
      },
      {
        title: 'Controllo giacenze',
        detail: 'Inventario permanente nel WMS in cloud con tracciabilità per lotto, seriale e criterio FEFO.',
      },
      {
        title: 'Preparazione ordini / Picking',
        detail: 'Prelievo guidato a radiofrequenza, doppia scansione EAN e imballaggio ecologico protettivo.',
      },
      {
        title: 'Distribuzione e ultimo miglio',
        detail: 'Consegne B2C e B2B in 24/48 h con tracciamento proattivo e prova di consegna digitale e-POD.',
      },
      {
        title: 'Logistica inversa e resi',
        detail: 'Gestione RMA, rientro merce, perizia di qualità entro 24 ore e reinserimento a stock.',
      },
    ],
  };

  const list = translationsMap[lang] || [];
  return SIX_CORE_OPERATIONS.map((op, idx) => ({
    code: op.code,
    title: list[idx]?.title || op.title,
    detail: list[idx]?.detail || op.detail,
  }));
}

// 4 Steps Workflow
export function getLocalizedSteps(lang: SupportedLanguage): WorkflowStep[] {
  if (lang === 'es') return HOW_IT_WORKS_STEPS;

  const map: Record<SupportedLanguage, WorkflowStep[]> = {
    es: HOW_IT_WORKS_STEPS,
    ca: [
      {
        stepNumber: '01',
        title: 'Integració EDI / API amb la teva botiga o ERP',
        durationNote: 'Posada en marxa en 48 h',
        description:
          'Connectem el teu catàleg mestre de referències (SKUs), codis EAN i flux de comandes des de Shopify, WooCommerce, PrestaShop o el teu ERP corporatiu.',
      },
      {
        stepNumber: '02',
        title: 'Recepció, control i ubicació en SGA',
        durationNote: 'Alta verificada en < 4 h',
        description:
          'Descarreguem la teva mercaderia als nostres molls de Barcelona o Tarragona, validem unitats, generem etiquetes SSCC i assignem ubicacions ABC.',
      },
      {
        stepNumber: '03',
        title: 'Picking RF i condicionament protector',
        durationNote: 'Cut-off diari 18:30 h',
        description:
          'Cada comanda confirmada abans de les 18:30 h s’extreu mitjançant radiofreqüència, passa control ponderal i s’embala segons l’estàndard tècnic acordat.',
      },
      {
        stepNumber: '04',
        title: 'Expedició 24/48 h, e-POD i retorn RMA',
        durationNote: 'OTIF auditat del 98,6%',
        description:
          'Despatxem per la ruta òptima d’última milla o grupatge, enviem tracking en viu al destinatari i processem devolucions en menys de 24 h.',
      },
    ],
    en: [
      {
        stepNumber: '01',
        title: 'EDI / REST API integration with your storefront or ERP',
        durationNote: 'Live in under 48 hours',
        description:
          'We link your master reference catalog (SKUs), EAN barcodes, and order feeds directly from Shopify, WooCommerce, PrestaShop, or your enterprise ERP.',
      },
      {
        stepNumber: '02',
        title: 'Inbound receipt, QC tally, and WMS slotting',
        durationNote: 'Stock verified in < 4 h',
        description:
          'We unload inbound cargo at our Barcelona or Tarragona logistics docks, verify unit counts, generate SSCC pallet labels, and assign ABC velocity slots.',
      },
      {
        stepNumber: '03',
        title: 'RF handheld picking & protective packaging',
        durationNote: 'Daily 18:30 CET cut-off',
        description:
          'Every order received before 18:30 is picked via RF scanners, verified on dynamic scales, and packed using sustainable custom materials.',
      },
      {
        stepNumber: '04',
        title: '24/48 h dispatch, digital e-POD & RMA returns',
        durationNote: 'Audited 98.6% OTIF',
        description:
          'We route cargo through the best last-mile or LTL carrier network, send real-time tracking links, and process customer returns in under 24 hours.',
      },
    ],
    fr: [
      {
        stepNumber: '01',
        title: 'Connexion EDI / API avec votre boutique ou ERP',
        durationNote: 'Déploiement en 48 h',
        description:
          'Nous synchronisons votre catalogue de références (SKU), vos codes-barres EAN et les flux de commandes depuis Shopify, WooCommerce ou votre ERP.',
      },
      {
        stepNumber: '02',
        title: 'Réception, pointage et mise en stock WMS',
        durationNote: 'Validation en < 4 h',
        description:
          'Nous déchargeons vos palettes sur nos quais de Barcelone ou Tarragone, émettons les étiquettes SSCC et attribuons les emplacements optimaux.',
      },
      {
        stepNumber: '03',
        title: 'Picking par radiofréquence et emballage soigné',
        durationNote: 'Cut-off quotidien à 18h30',
        description:
          'Toute commande validée avant 18h30 est prélevée par pistolet RF, pesée automatiquement et conditionnée selon votre charte de marque.',
      },
      {
        stepNumber: '04',
        title: 'Expédition 24/48 h, e-POD et logistique retour',
        durationNote: 'Taux OTIF audité à 98,6%',
        description:
          'Nous remettons les colis aux transporteurs optimaux, envoyons le lien de tracking au client et traitons les retours RMA sous 24 heures.',
      },
    ],
    de: [
      {
        stepNumber: '01',
        title: 'EDI- / API-Schnittstellenanbindung an Shop oder ERP',
        durationNote: 'Startklar in 48 Stunden',
        description:
          'Wir synchronisieren Ihren Artikelstamm (SKUs), EAN-Codes und Bestellströme nahtlos mit Shopify, WooCommerce, PrestaShop oder Ihrem Firmen-ERP.',
      },
      {
        stepNumber: '02',
        title: 'Wareneingang, Zählung und WMS-Einlagerung',
        durationNote: 'Bestand aktiv in < 4 h',
        description:
          'Wir entladen Ihre Ware an unseren Rampen in Barcelona oder Tarragona, generieren SSCC-Palettenetiketten und weisen ABC-Lagerplätze zu.',
      },
      {
        stepNumber: '03',
        title: 'RF-Kommissionierung und Schutzverpackung',
        durationNote: 'Täglicher Cut-off 18:30 Uhr',
        description:
          'Bestellungen bis 18:30 Uhr werden per RF-Scanner kommissioniert, durchlaufen die Gewichtskontrolle und werden sicher verpackt.',
      },
      {
        stepNumber: '04',
        title: '24/48 h Versand, e-POD und RMA-Retourenabwicklung',
        durationNote: '98,6% OTIF-Liefertreue',
        description:
          'Wir übergeben die Sendungen an die beste Route, senden Live-Tracking an den Empfänger und bearbeiten Rücksendungen binnen 24 Stunden.',
      },
    ],
    it: [
      {
        stepNumber: '01',
        title: 'Integrazione EDI / API con e-commerce o ERP',
        durationNote: 'Operativo in 48 ore',
        description:
          'Colleghiamo il catalogo articoli (SKU), i codici EAN e il flusso degli ordini provenienti da Shopify, WooCommerce o dal vostro software gestionale.',
      },
      {
        stepNumber: '02',
        title: 'Ricezione, collaudo quantitativo e stoccaggio WMS',
        durationNote: 'Merce a sistema in < 4 h',
        description:
          'Scarichiamo i colli nelle nostre baie di Barcellona o Tarragona, generiamo le etichette SSCC e assegniamo le posizioni secondo la rotazione ABC.',
      },
      {
        stepNumber: '03',
        title: 'Picking RF e confezionamento protettivo',
        durationNote: 'Cut-off giornaliero 18:30',
        description:
          'Ogni ordine confermato entro le 18:30 viene prelevato tramite radiofrequenza, controllato su bilancia dinamica e imballato con cura.',
      },
      {
        stepNumber: '04',
        title: 'Spedizione 24/48 h, firma e-POD e gestione resi RMA',
        durationNote: 'Indice OTIF al 98,6%',
        description:
          'Spediamo lungo la linea ottimale, inviamo il tracking in tempo reale al destinatario e gestiamo i resi entro 24 ore dall’arrivo.',
      },
    ],
  };

  return map[lang] || HOW_IT_WORKS_STEPS;
}

// 4 Why Choose Us Items
export function getLocalizedWhyChooseUs(lang: SupportedLanguage): WhyChooseUsItem[] {
  if (lang === 'es') return WHY_CHOOSE_US;

  const map: Record<SupportedLanguage, WhyChooseUsItem[]> = {
    es: WHY_CHOOSE_US,
    ca: [
      {
        id: 'ahorro-costes',
        index: '01',
        title: 'Estalvi de costos estructurals',
        metricHighlight: 'Fins a -32% enfront de magatzem propi',
        description:
          'Transforma costos fixos (arrendament de nau, carretons, llicències i personal en mesos vall) en costos variables lligats exactament als teus palets i enviaments reals.',
      },
      {
        id: 'envios-24-48h',
        index: '02',
        title: 'Enviaments garantits en 24/48 h',
        metricHighlight: '98,6% índex OTIF peninsular',
        description:
          'Connexió directa des dels eixos viaris AP-7, C-58 i A-2 a Catalunya cap a les plataformes nacionals de classificació nocturna i repartiment capil·lar.',
      },
      {
        id: 'stock-online',
        index: '03',
        title: 'Seguiment d’estoc online 24/7',
        metricHighlight: 'Visibilitat SKU, lot i sèrie',
        description:
          'Accés permanent al portal SGA al núvol per auditar existències disponibles, estoc compromès, entrades de proveïdor i traçabilitat e-POD.',
      },
      {
        id: 'tarifas-volumen',
        index: '04',
        title: 'Tarifes escalables per volum',
        metricHighlight: 'Economies d’escala immediates',
        description:
          'Accedeix des del primer enviament a les nostres tarifes corporatives negociades per gran volum en transport urgent, paleteria i consumibles d’embalatge.',
      },
    ],
    en: [
      {
        id: 'ahorro-costes',
        index: '01',
        title: 'Structural overhead cost reduction',
        metricHighlight: 'Up to -32% versus self-managed warehouse',
        description:
          'Convert fixed capital expenses (facility leases, forklift maintenance, software licenses, and off-season labor) into strictly variable pay-per-use costs.',
      },
      {
        id: 'envios-24-48h',
        index: '02',
        title: 'Guaranteed 24/48-hour delivery',
        metricHighlight: '98.6% peninsular OTIF performance',
        description:
          'Direct highway access from AP-7, C-58, and A-2 corridors in Catalonia feeding into overnight sorting hubs and domestic last-mile networks.',
      },
      {
        id: 'stock-online',
        index: '03',
        title: '24/7 cloud inventory visibility',
        metricHighlight: 'Item-level SKU, batch & serial tracking',
        description:
          'Real-time access to our secure client WMS portal to audit available inventory, committed allocations, inbound purchase orders, and e-POD signatures.',
      },
      {
        id: 'tarifas-volumen',
        index: '04',
        title: 'Tiered volume-driven pricing',
        metricHighlight: 'Immediate bulk economies of scale',
        description:
          'Tap into our heavily discounted corporate courier rates, freight contracts, and packaging procurement volumes from day one.',
      },
    ],
    fr: [
      {
        id: 'ahorro-costes',
        index: '01',
        title: 'Réduction des coûts fixes et structurels',
        metricHighlight: 'Jusqu’à -32% par rapport à un entrepôt propre',
        description:
          'Transformez vos coûts fixes (loyer d’entrepôt, chariots, licences WMS et personnel en période creuse) en charges variables indexées sur votre activité.',
      },
      {
        id: 'envios-24-48h',
        index: '02',
        title: 'Livraisons express en 24/48 h garanties',
        metricHighlight: '98,6% de taux de service OTIF',
        description:
          'Liaison immédiate aux nœuds autoroutiers AP-7, C-58 et A-2 en Catalogne connectant directement les plateformes de tri de nuit.',
      },
      {
        id: 'stock-online',
        index: '03',
        title: 'Suivi des stocks en ligne 24/7',
        metricHighlight: 'Visibilité SKU, lot et numéro de série',
        description:
          'Accès continu au portail WMS dans le cloud pour suivre les stocks réels, les commandes en préparation et les émargements électroniques.',
      },
      {
        id: 'tarifas-volumen',
        index: '04',
        title: 'Tarifs dégressifs au volume',
        metricHighlight: 'Économies d’échelle dès le 1er colis',
        description:
          'Bénéficiez dès le premier envoi de nos conditions tarifaires grands comptes négociées auprès des réseaux de transport express et d’emballage.',
      },
    ],
    de: [
      {
        id: 'ahorro-costes',
        index: '01',
        title: 'Senkung struktureller Fixkosten',
        metricHighlight: 'Bis zu -32% gegenüber eigenem Lager',
        description:
          'Wandeln Sie feste Kosten (Hallenmiete, Flurförderzeuge, Software und Personal in schwachen Monaten) in rein nutzungsabhängige variable Kosten um.',
      },
      {
        id: 'envios-24-48h',
        index: '02',
        title: 'Garantierte Zustellung in 24/48 h',
        metricHighlight: '98,6% OTIF-Liefertreue',
        description:
          'Direkte Anbindung an die katalanischen Autobahnkorridore AP-7, C-58 und A-2 zu den nationalen Nacht-Umschlaghubs und Paketdepots.',
      },
      {
        id: 'stock-online',
        index: '03',
        title: '24/7 Cloud-Bestandsüberwachung',
        metricHighlight: 'Transparenz nach SKU, Charge und Serie',
        description:
          'Ständiger Zugriff auf unser WMS-Kundenportal zur Überprüfung freier Bestände, reservierter Mengen, Wareneingänge und e-POD-Belege.',
      },
      {
        id: 'tarifas-volumen',
        index: '04',
        title: 'Skalierbare Volumentarife',
        metricHighlight: 'Sofortige Skalenvorteile',
        description:
          'Nutzen Sie ab der ersten Sendung unsere verhandelten Großkundenkonditionen für Expressfracht, Palettentransporte und Verpackungsmaterial.',
      },
    ],
    it: [
      {
        id: 'ahorro-costes',
        index: '01',
        title: 'Abbattimento dei costi strutturali',
        metricHighlight: 'Fino al -32% rispetto a un magazzino proprio',
        description:
          'Trasforma i costi fissi (canoni d’affitto capannone, muletti, licenze e personale nei mesi di bassa stagione) in costi variabili proporzionali all’attività reale.',
      },
      {
        id: 'envios-24-48h',
        index: '02',
        title: 'Consegne garantite in 24/48 h',
        metricHighlight: '98,6% indice OTIF peninsulare',
        description:
          'Accesso immediato agli assi autostradali AP-7, C-58 e A-2 in Catalogna verso gli hub nazionali di smistamento notturno.',
      },
      {
        id: 'stock-online',
        index: '03',
        title: 'Monitoraggio giacenze online 24/7',
        metricHighlight: 'Visibilità SKU, lotto e matricola',
        description:
          'Accesso continuo al gestionale WMS in cloud per verificare merci disponibili, ordini impegnati, arrivi da fornitori e firme digitali e-POD.',
      },
      {
        id: 'tarifas-volumen',
        index: '04',
        title: 'Tariffe scalabili a volume',
        metricHighlight: 'Economie di scala immediate',
        description:
          'Accedi fin dalla prima spedizione ai nostri accordi commerciali a grandi volumi per corrieri espressi, pallet e materiali d’imballo.',
      },
    ],
  };

  return map[lang] || WHY_CHOOSE_US;
}

// Stats & Testimonials
export function getLocalizedStats(lang: SupportedLanguage): ImpactStat[] {
  if (lang === 'es') return IMPACT_STATS;

  const map: Record<SupportedLanguage, ImpactStat[]> = {
    es: IMPACT_STATS,
    ca: [
      {
        value: '+1,2 M',
        label: 'Expedicions anuals gestionades',
        context: 'Paqueteria e-commerce B2C i paleteria comercial B2B des de Catalunya',
      },
      {
        value: '99,84%',
        label: 'Exactitud d’inventari i picking',
        context: 'Control mitjançant doble escaneig EAN/GS1 i pesatge dinàmic en sortida',
      },
      {
        value: '98,6%',
        label: 'Compliment OTIF en 24/48 h',
        context: 'Lliuraments a temps i complets al primer intent a la península',
      },
      {
        value: '14.500 m²',
        label: 'Superfície logística operativa',
        context: 'Naus equipades a CIM Vallès (Barcelona) i Riu Clar (Tarragona)',
      },
    ],
    en: [
      {
        value: '+1.2 M',
        label: 'Annual dispatches fulfilled',
        context: 'B2C e-commerce parcels and commercial B2B freight out of Catalonia',
      },
      {
        value: '99.84%',
        label: 'Picking & inventory accuracy',
        context: 'Secured via dual EAN/GS1 optical scanning and dynamic checkweighers',
      },
      {
        value: '98.6%',
        label: '24/48 h OTIF SLA fulfillment',
        context: 'On-time and in-full deliveries on the very first delivery attempt',
      },
      {
        value: '14,500 m²',
        label: 'Operational logistics footprint',
        context: 'Fully equipped hubs at CIM Vallès (Barcelona) and Riu Clar (Tarragona)',
      },
    ],
    fr: [
      {
        value: '+1,2 M',
        label: 'Expéditions annuelles opérées',
        context: 'Colis e-commerce B2C et palettes B2B au départ de Catalogne',
      },
      {
        value: '99,84%',
        label: 'Précision de préparation et stock',
        context: 'Contrôlé par double lecture optique EAN et pesage dynamique en sortie',
      },
      {
        value: '98,6%',
        label: 'Taux de service OTIF en 24/48 h',
        context: 'Livrées à l’heure et sans réserve dès le premier passage',
      },
      {
        value: '14.500 m²',
        label: 'Superficie logistique opérationnelle',
        context: 'Entrepôts au CIM Vallès (Barcelone) et Riu Clar (Tarragone)',
      },
    ],
    de: [
      {
        value: '+1,2 Mio.',
        label: 'Jährlich abgewickelte Sendungen',
        context: 'B2C-Onlineshop-Pakete und B2B-Palettentransporte ab Katalonien',
      },
      {
        value: '99,84%',
        label: 'Inventur- & Kommissioniergenauigkeit',
        context: 'Gesteuert über dualen EAN/GS1-Scan und dynamische Kontrollwaagen',
      },
      {
        value: '98,6%',
        label: '24/48 h OTIF-Liefertreue',
        context: 'Pünktliche und unversehrte Zustellung beim ersten Zustellversuch',
      },
      {
        value: '14.500 m²',
        label: 'Operative Logistikfläche',
        context: 'Moderne Hallen in CIM Vallès (Barcelona) und Riu Clar (Tarragona)',
      },
    ],
    it: [
      {
        value: '+1,2 Mln',
        label: 'Spedizioni annuali gestite',
        context: 'Pacchi e-commerce B2C e carichi su pallet B2B dalla Catalogna',
      },
      {
        value: '99,84%',
        label: 'Precisione inventario e prelievo',
        context: 'Verificato con doppia scansione ottica EAN e pesatura dinamica in uscita',
      },
      {
        value: '98,6%',
        label: 'Puntualità OTIF in 24/48 h',
        context: 'Consegne puntuali e complete al primo tentativo su tutta la penisola',
      },
      {
        value: '14.500 m²',
        label: 'Superficie logistica operativa',
        context: 'Impianti attrezzati a CIM Vallès (Barcellona) e Riu Clar (Tarragona)',
      },
    ],
  };

  return map[lang] || IMPACT_STATS;
}

export function getLocalizedTestimonials(lang: SupportedLanguage): ClientTestimonial[] {
  if (lang === 'es') return TESTIMONIALS;

  return TESTIMONIALS.map((t) => {
    if (t.id === 'botanica-mediterranea') {
      if (lang === 'ca') {
        return {
          ...t,
          quote:
            'Vam passar de preparar comandes manualment en un local propi amb errors de lot a operar amb control FEFO per radiofreqüència a TransRomero. En campanya de Black Friday vam expedir 900 comandes diàries abans de les 18:30 h sense cap ruptura de servei.',
          role: 'Cofundadora i Directora General',
          resultSummary: 'Control FEFO 100% · +38% recompra per lliurament 24 h',
        };
      }
      if (lang === 'en') {
        return {
          ...t,
          quote:
            'We transitioned from manual in-house packing prone to batch errors to fully automated RF FEFO fulfillment with TransRomero. During Black Friday peak, we dispatched over 900 daily orders before the 18:30 cut-off without a single service disruption.',
          role: 'Co-Founder & Managing Director',
          resultSummary: '100% FEFO traceability · +38% reorder rate via 24h delivery',
        };
      }
      if (lang === 'fr') {
        return {
          ...t,
          quote:
            'Nous sommes passés d’une préparation artisanale sujette aux erreurs à un contrôle FEFO par radiofréquence chez TransRomero. Pendant le Black Friday, nous avons expédié 900 commandes par jour avant 18h30 sans la moindre rupture.',
          role: 'Co-fondatrice et Directrice Générale',
          resultSummary: 'Contrôle FEFO 100% · +38% de réachat grâce à la livraison 24h',
        };
      }
      if (lang === 'de') {
        return {
          ...t,
          quote:
            'Wir stellten von fehleranfälliger Eigenkommissionierung auf RF-gestützte FEFO-Steuerung bei TransRomero um. Am Black Friday versendeten wir täglich 900 Bestellungen vor dem 18:30-Cut-off ohne einen einzigen Serviceausfall.',
          role: 'Mitgründerin und Geschäftsführerin',
          resultSummary: '100% FEFO-Kontrolle · +38% Wiederkaufsrate durch 24h-Lieferung',
        };
      }
      if (lang === 'it') {
        return {
          ...t,
          quote:
            'Siamo passati dal preparare gli ordini manualmente con frequenti errori di lotto alla gestione FEFO a radiofrequenza di TransRomero. Durante il Black Friday abbiamo spedito 900 ordini al giorno prima delle 18:30 senza alcun intoppo.',
          role: 'Cofondatrice e Direttrice Generale',
          resultSummary: 'Controllo FEFO 100% · +38% riordini grazie alla consegna 24h',
        };
      }
    }

    if (t.id === 'electrohogar-pyme') {
      if (lang === 'ca') {
        return {
          ...t,
          quote:
            'Importem petit electrodomèstic pel Port de Tarragona i utilitzar el servei NT-3PL-0104 amb règim de dipòsit duaner i distribució paletitzada ens va permetre diferir l’IVA d’importació i rebaixar un 29% el nostre cost logístic total.',
          role: 'Director d’Operacions i Compres',
          resultSummary: '-29% despesa logística · Traçabilitat per núm. de sèrie',
        };
      }
      if (lang === 'en') {
        return {
          ...t,
          quote:
            'We import consumer electronics through the Port of Tarragona. Adopting their NT-3PL-0104 customs bonded warehouse and pallet distribution allowed us to defer import VAT and slash our total logistics overhead by 29%.',
          role: 'Director of Operations & Procurement',
          resultSummary: '-29% overall logistics cost · Serial number traceability',
        };
      }
      if (lang === 'fr') {
        return {
          ...t,
          quote:
            'Nous importons du petit électroménager via le port de Tarragone. Leur service NT-3PL-0104 en entrepôt sous douane et distribution palettisée nous a permis de différer la TVA et d’économiser 29% sur notre budget logistique.',
          role: 'Directeur des Opérations et Achats',
          resultSummary: '-29% de dépenses logistiques · Traçabilité au numéro de série',
        };
      }
      if (lang === 'de') {
        return {
          ...t,
          quote:
            'Wir importieren Haushaltsgeräte über den Hafen von Tarragona. Dank des Zolllagerservices NT-3PL-0104 konnten wir die Einfuhrumsatzsteuer stunden und unsere gesamten Logistikkosten um 29% senken.',
          role: 'Leiter Betrieb und Einkauf',
          resultSummary: '-29% Logistikkosten · Seriennummern-Rückverfolgbarkeit',
        };
      }
      if (lang === 'it') {
        return {
          ...t,
          quote:
            'Importiamo elettrodomestici dal Porto di Tarragona. Il loro servizio NT-3PL-0104 con deposito doganale e distribuzione su pallet ci ha consentito di differire l’IVA all’importazione e tagliare il 29% dei costi logistici.',
          role: 'Direttore Operativo e Acquisti',
          resultSummary: '-29% spese logistiche · Tracciabilità per numero di serie',
        };
      }
    }

    if (t.id === 'atelier-vallesano') {
      if (lang === 'ca') {
        return {
          ...t,
          quote:
            'El protocol de logística inversa RMA ens va canviar el negoci: cada peça retornada es rep, revisa, reetiqueta i torna a figurar disponible a Shopify en menys de 24 hores, elevant la rotació de temporada un 19%.',
          role: 'Responsable d’E-Commerce i Supply Chain',
          resultSummary: 'Cicle RMA < 24 h · +19% recuperació de marge',
        };
      }
      if (lang === 'en') {
        return {
          ...t,
          quote:
            'Their structured RMA reverse logistics circuit transformed our apparel brand: returned garments are checked, retagged, and re-listed live on Shopify within 24 hours, increasing our seasonal turnover by 19%.',
          role: 'Head of E-Commerce & Supply Chain',
          resultSummary: 'RMA turnaround < 24 h · +19% margin recovery',
        };
      }
      if (lang === 'fr') {
        return {
          ...t,
          quote:
            'Leur circuit de logistique inverse RMA a révolutionné notre gestion : chaque vêtement retourné est inspecté, réétiqueté et remis en vente sur Shopify en moins de 24h, augmentant notre rotation de saison de 19%.',
          role: 'Responsable E-Commerce et Supply Chain',
          resultSummary: 'Cycle RMA < 24 h · +19% de marge préservée',
        };
      }
      if (lang === 'de') {
        return {
          ...t,
          quote:
            'Der RMA-Retourenkreislauf hat unser Textilgeschäft beflügelt: Jedes retournierte Kleidungsstück wird geprüft, neu etikettiert und in unter 24 Stunden wieder auf Shopify gelistet, was unseren Saisonabverkauf um 19% steigerte.',
          role: 'Leiterin E-Commerce & Supply Chain',
          resultSummary: 'RMA-Durchlauf < 24 h · +19% Margenrückgewinnung',
        };
      }
      if (lang === 'it') {
        return {
          ...t,
          quote:
            'Il protocollo di logistica inversa RMA ha cambiato il nostro business: ogni capo reso viene controllato, cartellinato e rimesso in vendita su Shopify in meno di 24 ore, incrementando la rotazione stagionale del 19%.',
          role: 'Responsabile E-Commerce e Supply Chain',
          resultSummary: 'Ciclo RMA < 24 h · +19% recupero del margine',
        };
      }
    }

    return t;
  });
}

// Blog Articles
export function getLocalizedArticles(lang: SupportedLanguage): BlogArticle[] {
  if (lang === 'es') return BLOG_ARTICLES;

  return BLOG_ARTICLES.map((art) => {
    if (art.id === 'peso-tasable-factor-estiba') {
      if (lang === 'ca') {
        return {
          ...art,
          category: 'Transport i Tarifació',
          readTime: '5 min de lectura',
          title: 'Com calcular el pes tarifable i optimitzar el factor d’estiba en carretera i grupatge LCL',
          excerpt:
            'Comprendre la relació entre pes brut real i volum ocupat evita sobrecostos ocults en expedicions de mercaderia lleugera o voluminosa.',
          authorRole: 'Tècnic Superior en Transport i Cap de Trànsit 3PL',
          paragraphs: [
            'En la contractació professional del transport de mercaderies, el transportista factura sempre pel valor superior entre el pes brut real i el pes volumètric calculat.',
            'En el transport terrestre per carretera (grupatge nacional i internacional CMR), s’aplica l’equivalència 1 m³ = 333 kg (o 1.750 kg per metre lineal de plataforma). En paqueteria express sol aplicar-se 1 m³ = 200 o 250 kg, i en grupatge marítim LCL 1 m³ = 1.000 kg.',
            'Reduir l’aire interior de les caixes mitjançant troquels multi-alçària al lloc de packing disminueix el cubicatge total fins a un 22%, situant l’expedició en un esglaó tarifari inferior.',
          ],
          technicalFormula:
            'Pes Volumètric Carretera (kg) = Llarg (m) × Ample (m) × Alt (m) × 333 kg/m³ · Es factura màx(Pes Brut, Pes Volumètric).',
        };
      }
      if (lang === 'en') {
        return {
          ...art,
          category: 'Freight & Rating',
          readTime: '5 min read',
          title: 'How to calculate chargeable weight and optimize stowage factors in road freight and LCL groupage',
          excerpt:
            'Mastering the ratio between gross physical weight and volumetric footprint prevents hidden surcharges on light or bulky cargo.',
          authorRole: 'Senior Freight Logistics Specialist & Traffic Manager',
          paragraphs: [
            'In commercial freight shipping, carriers bill strictly based on the greater of physical gross weight versus dimensional (volumetric) weight calculated using modal conversion factors.',
            'In European road freight (CMR groupage), the universal standard applies 1 m³ = 333 kg (or 1,750 kg per loading meter). In contrast, express couriers typically calculate 1 m³ = 200 or 250 kg, air freight applies 1 m³ = 167 kg, and ocean LCL groupage applies 1 m³ = 1,000 kg (weight or measure, W/M).',
            'Eliminating void space in shipping cartons via height-scored boxes at packaging benches cuts cubic volume by up to 22%, dropping consignments into cheaper weight brackets without reducing crush resistance (BCT).',
          ],
          technicalFormula:
            'Road Volumetric Weight (kg) = Length (m) × Width (m) × Height (m) × 333 kg/m³ · Billed at max(Gross Weight, Volumetric Weight).',
        };
      }
      if (lang === 'fr') {
        return {
          ...art,
          category: 'Transport et Tarification',
          readTime: '5 min de lecture',
          title: 'Comment calculer le poids taxable et optimiser le ratio d’arrimage en messagerie et groupage LCL',
          excerpt:
            'Comprendre l’arbitrage entre poids réel et volume évite les surcoûts imprévus sur les marchandises volumineuses.',
          authorRole: 'Responsable d’Exploitation Transport 3PL',
          paragraphs: [
            'Dans le transport de fret, le transporteur applique systématiquement la règle du payant pour : facturation au plus élevé entre le poids brut réel et le poids volumétrique.',
            'En transport routier (groupage CMR), le standard est fixé à 1 m³ = 333 kg (ou 1.750 kg par mètre de plancher). En colis express, la règle courante est 1 m³ = 250 kg, et en maritime LCL 1 m³ = 1.000 kg.',
            'Réduire l’air à l’intérieur des emballages permet de gagner jusqu’à 22% de volume, basculant l’envoi dans un palier tarifaire inférieur.',
          ],
          technicalFormula:
            'Poids Volumétrique Route (kg) = L (m) × l (m) × H (m) × 333 kg/m³ · Facturé au max(Poids Brut, Poids Volumétrique).',
        };
      }
      if (lang === 'de') {
        return {
          ...art,
          category: 'Transport & Frachtberechnung',
          readTime: '5 Min. Lesezeit',
          title: 'Berechnung des frachtpflichtigen Gewichts und Optimierung des Staufaktors im Straßengüterverkehr',
          excerpt:
            'Das Verständnis des Verhältnisses von Bruttogewicht zu Ladevolumen verhindert versteckte Mehrkosten bei leichten oder sperrigen Gütern.',
          authorRole: 'Staatlich geprüfter Speditionsbetriebswirt & Dispositionsleiter',
          paragraphs: [
            'Im gewerblichen Güterkraftverkehr berechnen Frachtführer grundsätzlich den höheren Wert aus tatsächlichem Bruttogewicht und rechnerischem Volumengewicht.',
            'Im Straßengüterverkehr (CMR-Sammelgut) gilt die Standardformel 1 m³ = 333 kg (bzw. 1.750 kg je Lademeter). Im Express-Paketdienst gilt meist 1 m³ = 250 kg, in der Luftfracht 1 m³ = 167 kg und im See-LCL 1 m³ = 1.000 kg.',
            'Durch passgenaue Multihöhen-Kartons am Packtisch lässt sich das Luftvolumen um bis zu 22% reduzieren, was die Sendung in eine günstigere Frachtklasse einstuft.',
          ],
          technicalFormula:
            'Volumengewicht Straße (kg) = L (m) × B (m) × H (m) × 333 kg/m³ · Abrechnung nach max(Bruttogewicht, Volumengewicht).',
        };
      }
      if (lang === 'it') {
        return {
          ...art,
          category: 'Trasporti e Tariffazione',
          readTime: '5 min di lettura',
          title: 'Come calcolare il peso tassabile e ottimizzare il fattore di stivaggio nel trasporto stradale ed LCL',
          excerpt:
            'Comprendere la relazione tra peso lordo e volume previene costi occulti su spedizioni voluminose.',
          authorRole: 'Responsabile Traffico Merci 3PL',
          paragraphs: [
            'Nel trasporto merci la tariffa viene sempre applicata sul valore maggiore tra peso effettivo lordo e peso volumetrico calcolato.',
            'Nel trasporto stradale (collettame CMR) lo standard applica 1 m³ = 333 kg (oppure 1.750 kg per metro lineare). Nei corrieri espressi si applica 1 m³ = 250 kg, e nel marittimo LCL 1 m³ = 1.000 kg.',
            'Ridurre gli spazi vuoti negli imballi al banco packing riduce il volume fino al 22%, facendo scendere la spedizione nello scaglione tariffario inferiore.',
          ],
          technicalFormula:
            'Peso Volumetrico Stradale (kg) = Lungh (m) × Largh (m) × Alt (m) × 333 kg/m³ · Fatturato al max(Peso Lordo, Peso Volumetrico).',
        };
      }
    }

    if (art.id === 'etiquetado-gs1-128-trazabilidad') {
      if (lang === 'ca') {
        return {
          ...art,
          category: 'Enginyeria de Magatzem (SGA)',
          readTime: '6 min de lectura',
          title: 'Estàndard GS1-128 (SSCC) i criteris FIFO/FEFO en magatzems multiclient 3PL',
          excerpt:
            'La codificació mitjançant identificadors d’aplicació permet automatitzar la recepció i garantir la traçabilitat de lots.',
          authorRole: 'Responsable de Sistemes SGA i Qualitat Operativa',
          paragraphs: [
            'Quan una pyme escala les seves vendes cap a cadenes de distribució, la simple etiqueta de producte EAN-13 resulta insuficient per gestionar europalets.',
            'L’estàndard GS1-128 concatena múltiples Identificadors d’Aplicació (IA) en un únic codi de barres: l’IA (00) defineix el codi SSCC com a matrícula única del palet, mentre que l’IA (01) identifica el GTIN, l’IA (10) el lot i l’IA (17) la caducitat.',
            'En escanejar l’etiqueta GS1-128 als nostres molls, el SGA valida la comanda, bloqueja lots en quarantena i ordena l’extracció sota regla FEFO.',
          ],
          technicalFormula:
            'Estructura clau GS1-128: IA (00) Matrícula SSCC 18 dígits + IA (01) GTIN + IA (10) Lot + IA (17) Caducitat AAMMDD.',
        };
      }
      if (lang === 'en') {
        return {
          ...art,
          category: 'Warehouse Engineering (WMS)',
          readTime: '6 min read',
          title: 'GS1-128 (SSCC) Barcode Standards and FIFO/FEFO Execution in 3PL Warehouses',
          excerpt:
            'Standardized Application Identifiers automate dock receiving, eliminate shipping errors, and guarantee full batch traceability.',
          authorRole: 'Head of WMS Systems & Operational Quality',
          paragraphs: [
            'When an e-commerce brand or manufacturer scales into retail chains, consumer-level EAN-13 barcodes become inadequate for master pallets.',
            'The GS1-128 standard concatenates multiple Application Identifiers (AIs) into a single barcode: AI (00) encodes the 18-digit SSCC pallet license plate, AI (01) the GTIN, AI (10) the manufacturing lot, and AI (17) the expiration date.',
            'A single scan at our receiving docks automatically reconciles purchase orders, holds quarantined lots, and instructs wave picking under strict FEFO rules.',
          ],
          technicalFormula:
            'GS1-128 Structure: AI (00) SSCC 18 digits + AI (01) GTIN + AI (10) Batch Lot + AI (17) Expiry Date YYMMDD.',
        };
      }
      if (lang === 'fr') {
        return {
          ...art,
          category: 'Ingénierie d’Entrepôt (WMS)',
          readTime: '6 min de lecture',
          title: 'Norme GS1-128 (SSCC) et règles FIFO/FEFO dans les entrepôts 3PL multi-clients',
          excerpt:
            'L’utilisation des identifiants d’application automatise la réception et assure la conformité sanitaire des lots.',
          authorRole: 'Responsable WMS et Qualité Logistique',
          paragraphs: [
            'Pour livrer la grande distribution, le simple code-barres produit EAN-13 ne suffit plus à gérer les unités logistiques supérieures.',
            'La norme GS1-128 regroupe plusieurs identifiants : l’IA (00) attribue le numéro SSCC unique de la palette, l’IA (01) le GTIN, l’IA (10) le lot et l’IA (17) la date de péremption.',
            'Au déchargement, le scan unique valide le bon de livraison et applique automatiquement la rotation FEFO en préparation.',
          ],
          technicalFormula:
            'Structure GS1-128 : IA (00) SSCC 18 chiffres + IA (01) GTIN + IA (10) Lot + IA (17) Péremption AAMMJJ.',
        };
      }
      if (lang === 'de') {
        return {
          ...art,
          category: 'Lagertechnik (WMS)',
          readTime: '6 Min. Lesezeit',
          title: 'GS1-128-Standard (NVE/SSCC) und FIFO/FEFO-Steuerung in 3PL-Multi-Client-Lagern',
          excerpt:
            'Anwendungsbezeichner ermöglichen die automatisierte Vereinnahmung an der Rampe und lückenlose Chargenrückverfolgbarkeit.',
          authorRole: 'Leiterin WMS-Systeme & Qualitätsmanagement',
          paragraphs: [
            'Bei der Belieferung von Handelsketten reicht der reine EAN-13-Artikelcode auf Palette oder Großkarton nicht mehr aus.',
            'Der GS1-128-Barcode bündelt mehrere Kennungen: AI (00) die 18-stellige NVE/SSCC als Palettennummer, AI (01) die GTIN, AI (10) die Charge und AI (17) das Mindesthaltbarkeitsdatum.',
            'Ein einziger Scan an der Rampe bucht den Wareneingang ein, sperrt fehlerhafte Chargen und steuert die Entnahme nach FEFO.',
          ],
          technicalFormula:
            'GS1-128-Struktur: AI (00) NVE/SSCC 18 Ziffern + AI (01) GTIN + AI (10) Charge + AI (17) MHD JJMMTT.',
        };
      }
      if (lang === 'it') {
        return {
          ...art,
          category: 'Ingegneria di Magazzino (WMS)',
          readTime: '6 min di lettura',
          title: 'Standard GS1-128 (SSCC) e criteri FIFO/FEFO nei magazzini 3PL multi-cliente',
          excerpt:
            'L’uso degli identificatori di applicazione automatizza il ricevimento a banchina e garantisce la tracciabilità dei lotti.',
          authorRole: 'Responsabile Sistemi WMS e Qualità',
          paragraphs: [
            'Per rifornire la GDO o i grandi canali di vendita, il codice EAN-13 non è sufficiente a gestire le unità di carico superiori.',
            'Lo standard GS1-128 concatena più identificatori: IA (00) definisce il codice SSCC della pedana, IA (01) il GTIN, IA (10) il lotto e IA (17) la scadenza.',
            'Scansionando l’etichetta in banchina, il WMS valida l’ordine di acquisto ed ordina il prelievo rigorosamente in logica FEFO.',
          ],
          technicalFormula:
            'Struttura GS1-128: IA (00) SSCC 18 cifre + IA (01) GTIN + IA (10) Lotto + IA (17) Scadenza AAMMGG.',
        };
      }
    }

    if (art.id === 'indicador-otif-logistica-inversa-rma') {
      if (lang === 'ca') {
        return {
          ...art,
          category: 'Fulfillment i Última Milla',
          readTime: '4 min de lectura',
          title: 'Maximitzar el KPI OTIF i rendibilitzar la logística inversa mitjançant protocols RMA',
          excerpt:
            'Com mesurar el nivell de servei logístic en comerç electrònic i com recuperar marge comercial accelerant les devolucions.',
          authorRole: 'Consultor d’Operacions E-Commerce i Última Milla',
          paragraphs: [
            'L’indicador OTIF (On Time In Full) mesura el percentatge de comandes que compleixen simultàniament el termini i les referències correctes.',
            'Sense un circuit estructurat d’autorització de retorn (RMA), les devolucions perden valor comercial per canvi de temporada.',
            'Implantar un protocol de triatge en menys de 24 hores permet classificar ràpidament la mercaderia en Grau A per a revenda immediata.',
          ],
          technicalFormula:
            'KPI OTIF (%) = (Comandes lliurades a temps × Comandes completes i sense danys) / Total comandes expedides × 100.',
        };
      }
      if (lang === 'en') {
        return {
          ...art,
          category: 'Fulfillment & Last-Mile',
          readTime: '4 min read',
          title: 'Maximizing OTIF KPIs and Unlocking Margin via Structured RMA Reverse Logistics',
          excerpt:
            'How to accurately audit order fulfillment SLAs and preserve commercial margin by accelerating customer returns processing.',
          authorRole: 'Supply Chain Consultant & Last-Mile Operations Lead',
          paragraphs: [
            'The On Time In Full (OTIF) KPI measures the percentage of customer shipments that satisfy both conditions: delivered within the promised transit window (On Time) and containing exact SKU quantities in pristine condition (In Full).',
            'Without a dedicated Return Merchandise Authorization (RMA) process, returned inventory sits unprocessed in receiving bays and rapidly loses seasonal retail value.',
            'Deploying a sub-24-hour triage inspection allows brands to immediately grade returns into Grade A (instant restock) or Grade B (outlet/repacking), preserving gross margin.',
          ],
          technicalFormula:
            'OTIF KPI (%) = (Orders delivered on time × Orders complete & undamaged) / Total orders dispatched × 100.',
        };
      }
      if (lang === 'fr') {
        return {
          ...art,
          category: 'Fulfillment et Dernier Kilomètre',
          readTime: '4 min de lecture',
          title: 'Maximiser l’indicateur OTIF et rentabiliser la logistique inverse grâce aux RMA',
          excerpt:
            'Mesurer le niveau de service réel et préserver les marges en accélérant le traitement des retours clients.',
          authorRole: 'Consultant E-Commerce et Logistique Urbaine',
          paragraphs: [
            'L’indicateur OTIF (On Time In Full) calcule la proportion de commandes livrées à l’heure exacte et avec les références commandées en parfait état.',
            'Sans procédure claire de retour (RMA), les articles retournés s’accumulent et perdent de leur valeur marchande avec l’évolution des collections.',
            'Traiter les retours en moins de 24 heures permet de réintégrer immédiatement les pièces conformes dans le stock disponible à la vente.',
          ],
          technicalFormula:
            'Indicateur OTIF (%) = (Commandes livrées à l’heure × Commandes complètes et intactes) / Total commandes expédiées × 100.',
        };
      }
      if (lang === 'de') {
        return {
          ...art,
          category: 'Fulfillment & Letzte Meile',
          readTime: '4 Min. Lesezeit',
          title: 'OTIF-Kennzahl maximieren und Retourenlogistik über RMA-Prozesse profitabel machen',
          excerpt:
            'Wie Sie das reale Service-Level messen und durch beschleunigte Retourenaufbereitung Handelsmargen sichern.',
          authorRole: 'Berater für E-Commerce-Logistik und Letzte Meile',
          paragraphs: [
            'Die OTIF-Quote (On Time In Full) misst den prozentualen Anteil an Aufträgen, die pünktlich geliefert werden und vollständig den bestellten Artikeln entsprechen.',
            'Ohne standardisierten RMA-Retourenablauf verweilt Rücksendeware unbearbeitet und verliert drastisch an saisonalem Marktwert.',
            'Eine Begutachtung binnen 24 Stunden ermöglicht die sofortige Einstufung in A-Ware zur direkten Freigabe im Onlineshop.',
          ],
          technicalFormula:
            'OTIF KPI (%) = (Pünktlich zugestellte Aufträge × Vollständige unbeschädigte Aufträge) / Gesamtaufträge × 100.',
        };
      }
      if (lang === 'it') {
        return {
          ...art,
          category: 'Fulfillment e Ultimo Miglio',
          readTime: '4 min di lettura',
          title: 'Massimizzare il KPI OTIF e valorizzare la logistica inversa con protocolli RMA',
          excerpt:
            'Come misurare con precisione il livello di servizio e recuperare margine velocizzando la gestione dei resi.',
          authorRole: 'Consulente Operativo E-Commerce e Logistica',
          paragraphs: [
            'L’indicatore OTIF (On Time In Full) valuta la percentuale di ordini consegnati entro i termini pattuiti e contenenti esattamente i prodotti richiesti in perfetto stato.',
            'Senza un’autorizzazione al reso (RMA) strutturata, la merce restituita rischia di svalutarsi a causa del cambio di stagione.',
            'Un collaudo entro 24 ore consente di reinserire subito i capi integri tra le disponibilità attive del negozio online.',
          ],
          technicalFormula:
            'KPI OTIF (%) = (Ordini consegnati in tempo × Ordini completi e integri) / Totale ordini spediti × 100.',
        };
      }
    }

    return art;
  });
}

// Legal Documents
export function getLocalizedLegalDocuments(
  lang: SupportedLanguage
): Record<LegalDocKey, LegalDocument> {
  if (lang === 'es') return LEGAL_DOCUMENTS;

  if (lang === 'ca') {
    return {
      'aviso-legal': {
        key: 'aviso-legal',
        title: 'Avís Legal (Projecte Acadèmic de Logística 3PL)',
        updatedAt: 'Novembre 2026',
        sections: [
          {
            heading: '1. Dades Identificatives i Caràcter Formatiu',
            body: 'Aquest portal web correspon a una empresa fictícia anomenada TransRomero Logística y Distribución, S.L. (NIF simulat B-67942180), desenvolupada en l’àmbit formatiu de Grau Superior en Transport, Logística i Comerç Internacional. Tots els productes tècnics i tarifes tenen finalitat demostrativa.',
          },
          {
            heading: '2. Objecte de la Plataforma',
            body: 'Exposar de forma rigorosa el catàleg tècnic de serveis logístics 3PL (emmagatzematge paletitzat i duaner ADT/DDA, fulfillment per radiofreqüència i distribució 24/48 h amb logística inversa RMA).',
          },
          {
            heading: '3. Propietat Intel·lectual i Absència de Vincle Contractual',
            body: 'Les fitxes tècniques, referències internes i simulacions tarifàries reflecteixen estàndards reals del sector logístic (UNE-EN 15635, GS1-128, LOTT, CMR i Incoterms® 2020), sense constituir oferta comercial vinculant.',
          },
        ],
      },
      privacidad: {
        key: 'privacidad',
        title: 'Política de Privadesa (Simulació Acadèmica RGPD)',
        updatedAt: 'Novembre 2026',
        sections: [
          {
            heading: '1. Processament Local al Navegador',
            body: 'En tractar-se d’una aplicació web educativa, la informació introduïda al formulari de contacte i sol·licitud de pressupost es processa exclusivament a la memòria local del navegador sense emmagatzemar-se en servidors externs.',
          },
          {
            heading: '2. Marc Normatiu de Referència (RGPD)',
            body: 'En un entorn productiu real, el responsable tractaria les dades professionals amb la finalitat d’elaborar estudis logístics i cotitzacions B2B a l’empara del Reglament (UE) 2016/679.',
          },
        ],
      },
      cookies: {
        key: 'cookies',
        title: 'Política de Cookies (Simulació LSSI-CE)',
        updatedAt: 'Novembre 2026',
        sections: [
          {
            heading: '1. Ús Exclusiu d’Estat Tècnic',
            body: 'Aquest lloc web no utilitza cookies publicitàries ni rastrejadors comercials de tercers. Únicament empra memòria local del navegador per mantenir la navegació fluida i conservar preferències d’idioma.',
          },
        ],
      },
    };
  }

  if (lang === 'en') {
    return {
      'aviso-legal': {
        key: 'aviso-legal',
        title: 'Legal Notice (Academic 3PL Logistics Project)',
        updatedAt: 'November 2026',
        sections: [
          {
            heading: '1. Corporate Identity & Educational Purpose',
            body: 'This website represents a fictional academic entity named TransRomero Logística y Distribución, S.L. (simulated Tax ID B-67942180), developed within the Higher Vocational Training Program in Transport, Logistics and Global Trade. All technical specs, figures, and quotes are illustrative.',
          },
          {
            heading: '2. Scope of the Platform',
            body: 'To demonstrate the technical operations of a 3PL logistics provider (palletized & bonded warehousing ADT/DDA, RF fulfillment, and 24/48-hour freight distribution with RMA reverse logistics).',
          },
          {
            heading: '3. Intellectual Property & Non-Binding Character',
            body: 'Technical parameters and formulas reference recognized industry benchmarks (UNE-EN 15635, GS1-128, CMR Convention, and Incoterms® 2020) without constituting a binding commercial contract.',
          },
        ],
      },
      privacidad: {
        key: 'privacidad',
        title: 'Privacy Policy (Academic GDPR Simulation)',
        updatedAt: 'November 2026',
        sections: [
          {
            heading: '1. Client-Side Browser Execution',
            body: 'As an educational demonstration, information submitted via the quotation request form is handled strictly in browser local memory and is never transmitted to external databases or third-party marketing services.',
          },
          {
            heading: '2. Regulatory Reference (EU GDPR)',
            body: 'In an active commercial setting, corporate inquiry data would be processed under Article 6.1.b of Regulation (EU) 2016/679 to issue formal B2B logistics feasibility studies.',
          },
        ],
      },
      cookies: {
        key: 'cookies',
        title: 'Cookie Policy (Educational Compliance)',
        updatedAt: 'November 2026',
        sections: [
          {
            heading: '1. Sole Use of Functional Local State',
            body: 'This website does not employ third-party advertising cookies or trackers. It strictly uses local storage to maintain session navigation and persist language preferences.',
          },
        ],
      },
    };
  }

  if (lang === 'fr') {
    return {
      'aviso-legal': {
        key: 'aviso-legal',
        title: 'Mentions Légales (Projet Académique Logistique 3PL)',
        updatedAt: 'Novembre 2026',
        sections: [
          {
            heading: '1. Informations Légales et Vocation Pédagogique',
            body: 'Ce site internet correspond à une entreprise fictive nommée TransRomero Logística y Distribución, S.L. (NIF simulé B-67942180), développée dans le cadre de la formation supérieure en Transport, Logistique et Commerce International.',
          },
          {
            heading: '2. Objet du Site',
            body: 'Présenter de manière rigoureuse le catalogue technique des prestations logistiques 3PL (stockage sous douane ADT/DDA, fulfillment par radiofréquence et distribution express).',
          },
          {
            heading: '3. Absence d’Engagement Contractuel',
            body: 'Les fiches techniques et calculs tarifaires s’inspirent des normes réelles du secteur (GS1-128, CMR et Incoterms® 2020) sans constituer une offre commerciale contractuelle.',
          },
        ],
      },
      privacidad: {
        key: 'privacidad',
        title: 'Politique de Confidentialité (Simulation RGPD)',
        updatedAt: 'Novembre 2026',
        sections: [
          {
            heading: '1. Traitement Local dans le Navigateur',
            body: 'Les données renseignées dans le formulaire de devis sont traitées exclusivement dans la mémoire locale de votre navigateur sans aucun transfert vers des serveurs tiers.',
          },
          {
            heading: '2. Cadre Réglementaire (RGPD)',
            body: 'Dans un contexte commercial réel, les coordonnées professionnelles seraient traitées au titre du Règlement (UE) 2016/679 pour l’établissement d’offres logistiques.',
          },
        ],
      },
      cookies: {
        key: 'cookies',
        title: 'Politique de Cookies (Usage Technique)',
        updatedAt: 'Novembre 2026',
        sections: [
          {
            heading: '1. Aucun Cookie Publicitaire',
            body: 'Ce site n’utilise aucun traceur publicitaire. Seule la mémoire de stockage local du navigateur est utilisée pour enregistrer le choix de langue et la fluidité de navigation.',
          },
        ],
      },
    };
  }

  if (lang === 'de') {
    return {
      'aviso-legal': {
        key: 'aviso-legal',
        title: 'Impressum (Akademisches 3PL-Logistikprojekt)',
        updatedAt: 'November 2026',
        sections: [
          {
            heading: '1. Angaben und Ausbildungszweck',
            body: 'Diese Plattform repräsentiert ein fiktives Unternehmen namens TransRomero Logística y Distribución, S.L. (simulierte Steuernummer B-67942180), erstellt im Rahmen des staatlichen Ausbildungsgangs für Spedition, Logistik und Außenhandel.',
          },
          {
            heading: '2. Zweck der Plattform',
            body: 'Detaillierte Darstellung des Leistungsportfolios eines 3PL-Logistikdienstleisters (Paletten- und Zolllagerung ADT/DDA, RF-Kommissionierung und 24/48-Stunden-Frachttransport).',
          },
          {
            heading: '3. Keine bindenden Angebote',
            body: 'Sämtliche Leistungsdaten und Formeln orientieren sich an echten Branchenstandards (UNE-EN 15635, GS1-128, CMR und Incoterms® 2020), stellen jedoch kein rechtlich bindendes Angebot dar.',
          },
        ],
      },
      privacidad: {
        key: 'privacidad',
        title: 'Datenschutzerklärung (DSGVO-Simulation)',
        updatedAt: 'November 2026',
        sections: [
          {
            heading: '1. Lokale Browserverarbeitung',
            body: 'Im Anfrageformular eingegebene Daten werden ausschließlich im lokalen Speicher Ihres Webbrowsers verarbeitet und nicht an externe Server übertragen.',
          },
          {
            heading: '2. Referenzrahmen (EU-DSGVO)',
            body: 'Im regulären Geschäftsbetrieb würden Anfragedaten gemäß Art. 6 Abs. 1 lit. b DSGVO zur Angebotserstellung erhoben.',
          },
        ],
      },
      cookies: {
        key: 'cookies',
        title: 'Cookie-Richtlinie (Funktionale Speicherung)',
        updatedAt: 'November 2026',
        sections: [
          {
            heading: '1. Verzicht auf Werbe-Cookies',
            body: 'Diese Website setzt keine Marketing- oder Tracking-Cookies ein. Es wird lediglich lokaler Webspeicher für Spracheinstellungen genutzt.',
          },
        ],
      },
    };
  }

  if (lang === 'it') {
    return {
      'aviso-legal': {
        key: 'aviso-legal',
        title: 'Note Legali (Progetto Didattico Logistica 3PL)',
        updatedAt: 'Novembre 2026',
        sections: [
          {
            heading: '1. Dati Societari e Finalità Didattica',
            body: 'Questo sito web corrisponde a un’impresa fittizia denominata TransRomero Logística y Distribución, S.L. (P.IVA simulata B-67942180), sviluppata nell’ambito del Corso Superiore di Trasporti, Logistica e Commercio Internazionale.',
          },
          {
            heading: '2. Oggetto della Piattaforma',
            body: 'Illustrare con precisione tecnica i servizi di un operatore 3PL (stoccaggio pallet e deposito doganale ADT/DDA, fulfillment a radiofrequenza e trasporto 24/48 h).',
          },
          {
            heading: '3. Proprietà e Assenza di Vincolo Contrattuale',
            body: 'Parametri e formule ricalcano standard di settore riconosciuti (UNE-EN 15635, GS1-128, CMR e Incoterms® 2020) senza costituire offerta commerciale vincolante.',
          },
        ],
      },
      privacidad: {
        key: 'privacidad',
        title: 'Informativa sulla Privacy (Simulazione GDPR)',
        updatedAt: 'Novembre 2026',
        sections: [
          {
            heading: '1. Elaborazione Locale nel Browser',
            body: 'Trattandosi di un’applicazione didattica, i dati inseriti nel modulo preventivo vengono elaborati nella memoria del browser senza trasmissione a server esterni.',
          },
          {
            heading: '2. Riferimento Normativo (GDPR)',
            body: 'In un contesto operativo reale i dati aziendali verrebbero trattati ai sensi dell’art. 6.1.b del Regolamento (UE) 2016/679 per l’elaborazione di preventivi B2B.',
          },
        ],
      },
      cookies: {
        key: 'cookies',
        title: 'Informativa sui Cookie (Solo Tecnici)',
        updatedAt: 'Novembre 2026',
        sections: [
          {
            heading: '1. Nessun Cookie Pubblicitario',
            body: 'Questo sito non impiega cookie di profilazione o marketing. Utilizza esclusivamente la memoria locale del browser per preservare la scelta della lingua.',
          },
        ],
      },
    };
  }

  return LEGAL_DOCUMENTS;
}
