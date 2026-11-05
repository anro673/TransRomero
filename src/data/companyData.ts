import heroFulfillmentImg from '../assets/images/transromero_hero_hub_1793809620397.jpg';
import pickingPackingImg from '../assets/images/transromero_picking_vm_1793810904689.jpg';
import lastMileFleetImg from '../assets/images/transromero_fleet_vm_1793810905662.jpg';
import warehouseRackingImg from '../assets/images/transromero_pallet_vm_1793810901986.jpg';
import headquartersImg from '../assets/images/transromero_corporate_center_1793809626871.jpg';
import maritimeContainerImg from '../assets/images/transromero_lcl_vm_1793810907087.jpg';

// Configuración corporativa centralizada
export const COMPANY_INFO = {
  brandName: 'TransRomero',
  legalName: 'TransRomero Logística y Distribución, S.L.',
  nif: 'B-67942180 (Empresa ficticia académica)',
  slogan: 'Soluciones integrales de almacenaje, fulfillment y distribución 3PL en Cataluña',
  hubBarcelona:
    'Polígono Logístico CIM Vallès, Calle Llobregat, Nave 14 · 08130 Santa Perpètua de Mogoda (Barcelona)',
  hubTarragona: 'Polígono Industrial Riu Clar, Parcela 28 · 43006 Tarragona',
  phoneBarcelona: '+34 935 18 42 70',
  phoneTarragona: '+34 977 29 64 10',
  email: 'presupuestos@transromero.es',
  schedule: 'Lunes a Viernes de 07:30 a 19:30 CET · Cut-off expediciones mismo día: 18:30 h',
  images: {
    logo: '/assets/aistudio/logo_transromero_vm.png',
    hero: heroFulfillmentImg,
    warehouse: warehouseRackingImg,
    picking: pickingPackingImg,
    fleet: lastMileFleetImg,
    headquarters: headquartersImg,
    maritime: maritimeContainerImg,
  },
};

export interface TechnicalSpecRow {
  label: string;
  value: string;
}

export interface LogisticsProduct {
  id: string;
  techNumber: string;
  internalRef: string;
  standardCode: string;
  title: string;
  shortCategory: string;
  image: string;
  imageAlt: string;
  fallbackType: 'warehouse' | 'picking' | 'fleet';
  definition: string;
  keyTechnicalFeatures: string[];
  specTable: TechnicalSpecRow[];
  baseTariff: string;
  tariffUnit: string;
}

// 3 Productos Logísticos Concretos con terminología de Técnico Superior (Logística y Comercio Internacional)
export const LOGISTICS_PRODUCTS: LogisticsProduct[] = [
  {
    id: 'prod-alm-paletizado',
    techNumber: 'NT-3PL-0104',
    internalRef: 'TRM-ALM-EUR80',
    standardCode: 'UNE-EN 15635 · CAU Art. 240 (ADT / DDA)',
    title: 'Custodia Paletizada Multicliente y Depósito Aduanero Flexible',
    shortCategory: 'Almacenaje Estático y Régimen Aduanero',
    image: warehouseRackingImg,
    imageAlt:
      'Pasillo de estanterías selectivas con europalets EPAL etiquetados y técnica auditando inventario con tablet SGA',
    fallbackType: 'warehouse',
    definition:
      'Servicio técnico de recepción en muelle, desconsolidación de contenedor FCL/LCL y almacenaje en estantería selectiva para unidades de carga paletizadas estándar europeo (EUR-EPAL 1.200 × 800 mm) e industrial (1.200 × 1.000 mm). Habilitado para mercancía de libre práctica UE y mercancía no comunitaria bajo régimen suspensivo de Almacén de Depósito Temporal (ADT) y Depósito Distinto del Aduanero (DDA).',
    keyTechnicalFeatures: [
      'Gestión de ubicaciones caótica dirigida por SGA (WMS) según análisis de rotación ABC y criterios estrictos FIFO (First In, First Out) y FEFO (control de caducidad y lote).',
      'Identificación unívoca de unidades de carga mediante etiqueta logística estándar GS1-128 con código seriado de contenedor de envío (SSCC de 18 dígitos).',
      'Suspensión del devengo de derechos arancelarios de importación e IVA (Reglamento UE 952/2013 CAU) hasta el despacho a libre práctica (DUA) o reexportación.',
      'Descarga y verificación física de mercancía contenedorizada con emisión de parte de incidencias o reservas en CMR / Bill of Lading en menos de 4 horas.',
    ],
    specTable: [
      { label: 'Unidad de carga admitida', value: 'EUR-EPAL (1200×800 mm) / FIN (1200×1000 mm)' },
      { label: 'Capacidad máxima por hueco', value: '1.200 kg peso bruto · Altura máx. 1.850 mm' },
      { label: 'Trazabilidad e inventario', value: 'GS1-128 (SSCC) · Fiabilidad auditada 99,84%' },
      { label: 'Régimen fiscal / aduanero', value: 'Nacional UE · ADT (90 días) · DDA ilimitado' },
      { label: 'Condición ambiental y seguridad', value: '15 °C – 25 °C seco · PCI ESFR · TAPA FSR' },
    ],
    baseTariff: '10,50 €',
    tariffUnit: 'por hueco de palet / mes + manipulación E/S',
  },
  {
    id: 'prod-fulfillment-rf',
    techNumber: 'NT-3PL-0208',
    internalRef: 'TRM-PCK-GS128',
    standardCode: 'ISO 9001:2015 · EDI / API REST · EAN-13 / GTIN-14',
    title: 'Fulfillment E-Commerce Omnicanal y Picking Unitario por Radiofrecuencia',
    shortCategory: 'Preparación de Pedidos (Pick & Pack) y Control de Stock',
    image: pickingPackingImg,
    imageAlt:
      'Operaria realizando picking multirreferencia con escáner óptico y carro clasificador de pedidos e-commerce',
    fallbackType: 'picking',
    definition:
      'Operativa de preparación de pedidos de alta frecuencia para tiendas online (B2C) y reposición retail (B2B) mediante extracción por oleadas (wave picking) y agrupación multirreferencia (batch picking) guiada por radiofrecuencia. Incluye sincronización de stock en tiempo real, verificación ponderal y volumétrica, acondicionamiento protector sostenible y emisión automática de documentación de expedición.',
    keyTechnicalFeatures: [
      'Integración bidireccional vía API REST y mensajería EDI (ORDERS, DESADV, INVRPT) con Shopify, WooCommerce, PrestaShop, Amazon Seller y sistemas ERP.',
      'Doble lectura óptica de código EAN-13 / GTIN-14 en ubicación dinámica carton-flow y en mesa de packing, reduciendo la tasa de discrepancia por debajo del 0,16%.',
      'Optimización del embalaje mediante cartón corrugado canal doble ECT-32 certificado FSC, minimizando el peso volumétrico tasable en transporte urgente.',
      'Operaciones de valor añadido (VAS): kitting promocional, enfajado, etiquetado comercial multilingüe y emisión de packing list valorado o albarán ciego.',
    ],
    specTable: [
      { label: 'Método de extracción', value: 'Wave & Batch Picking por terminal RF' },
      { label: 'Sincronización de inventario', value: 'Tiempo real (< 5 min) vía API / Webhook' },
      { label: 'Hora de corte (Cut-off SLA)', value: '18:30 CET con expedición en el mismo día' },
      { label: 'Control de calidad salida', value: 'Doble escaneo EAN + báscula dinámica' },
      { label: 'Ratio de exactitud picking', value: '99,84% de líneas servidas sin incidencia' },
    ],
    baseTariff: '1,65 €',
    tariffUnit: 'por pedido base preparado (1ª línea incl.)',
  },
  {
    id: 'prod-distribucion-cmr-rma',
    techNumber: 'NT-3PL-0315',
    internalRef: 'TRM-DST-CMR24',
    standardCode: 'LOTT · Convenio CMR · Incoterms® 2020 (FCA / DAP / DDP)',
    title: 'Distribución Capilar 24/48 h, Grupaje LTL y Circuito de Logística Inversa (RMA)',
    shortCategory: 'Transporte Nacional, Última Milla y Devoluciones',
    image: lastMileFleetImg,
    imageAlt:
      'Camión tráiler de grupaje LTL y furgonetas de reparto 24/48 h con imagen corporativa circulando en Cataluña',
    fallbackType: 'fleet',
    definition:
      'Servicio de transporte multimodal de distribución capilar B2C en 24/48 horas, paquetería industrial y grupaje paletizado LTL en ámbito ibérico y transfronterizo UE, integrado con un protocolo de logística inversa bajo autorización de retorno (RMA) para inspección técnica, reacondicionamiento y reincorporación inmediata al stock comercializable.',
    keyTechnicalFeatures: [
      'Enrutamiento algorítmico multi-transportista según código postal, perfil volumétrico y nivel de servicio, alcanzando un índice OTIF (On Time In Full) del 98,6%.',
      'Aplicación transparente de reglas de tasación estándar: factor de estiba carretera 1 m³ = 333 kg (paquetería express 1 m³ = 250 kg; metro lineal LTL = 1.750 kg).',
      'Plena compatibilidad documental con compraventas bajo reglas Incoterms® 2020: entrega en muelle propio FCA (CIM Vallès / Riu Clar) o servicio puerta a puerta DAP / DDP.',
      'Gestión integral de devoluciones (RMA): recogida domiciliaria o red PUDO, peritaje de calidad en menos de 24 h y actualización automática del stock vendible.',
    ],
    specTable: [
      { label: 'Tránsito garantizado SLA', value: '24 h Cataluña y capitales · 48 h Península' },
      { label: 'Factor de conversión / estiba', value: '1 m³ = 250 kg (B2C) / 333 kg (Industrial)' },
      { label: 'Marco jurídico y cobertura', value: 'Ley 15/2009 (LCTTM) · Convenio CMR UE' },
      { label: 'Prueba de entrega digital', value: 'e-POD con geolocalización y firma digital' },
      { label: 'Ciclo de logística inversa', value: 'Triaje y alta en stock apto en < 24 horas' },
    ],
    baseTariff: '3,45 €',
    tariffUnit: 'por expedición nacional hasta 2 kg tasables',
  },
];

export const SIX_CORE_OPERATIONS = [
  {
    code: 'OP-01',
    title: 'Recepción de mercancía',
    detail: 'Descarga de contenedores y palets, conteo físico, control de albarán y etiquetado GS1.',
  },
  {
    code: 'OP-02',
    title: 'Almacenaje flexible',
    detail: 'Custodia en estantería convencional y dinámica pagando solo por ocupación real mensual.',
  },
  {
    code: 'OP-03',
    title: 'Control de stock',
    detail: 'Inventario permanente en SGA conectado 24/7 con trazabilidad por lote, serie y FEFO.',
  },
  {
    code: 'OP-04',
    title: 'Preparación de pedidos / Picking',
    detail: 'Extracción guiada por radiofrecuencia, doble verificación EAN y embalaje sostenible.',
  },
  {
    code: 'OP-05',
    title: 'Distribución nacional y última milla',
    detail: 'Entregas B2C y B2B en 24/48 h con seguimiento activo y prueba de entrega e-POD.',
  },
  {
    code: 'OP-06',
    title: 'Logística inversa',
    detail: 'Gestión de RMA, recogida, control de calidad en 24 h y reintegración al stock activo.',
  },
];

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  durationNote: string;
  description: string;
}

export const HOW_IT_WORKS_STEPS: WorkflowStep[] = [
  {
    stepNumber: '01',
    title: 'Integración EDI / API con tu tienda o ERP',
    durationNote: 'Puesta en marcha en 48 h',
    description:
      'Conectamos tu catálogo maestro de referencias (SKUs), códigos EAN y flujo de pedidos desde Shopify, WooCommerce, PrestaShop o tu ERP corporativo.',
  },
  {
    stepNumber: '02',
    title: 'Recepción, control y ubicación en SGA',
    durationNote: 'Alta verificada en < 4 h',
    description:
      'Descargamos tu mercancía en nuestros muelles de Barcelona o Tarragona, validamos unidades, generamos etiquetas SSCC y asignamos ubicaciones ABC.',
  },
  {
    stepNumber: '03',
    title: 'Picking RF y acondicionamiento protector',
    durationNote: 'Cut-off diario 18:30 h',
    description:
      'Cada pedido confirmado antes de las 18:30 h se extrae mediante radiofrecuencia, pasa control ponderal y se embala según el estándar técnico acordado.',
  },
  {
    stepNumber: '04',
    title: 'Expedición 24/48 h, e-POD y retorno RMA',
    durationNote: 'OTIF auditado del 98,6%',
    description:
      'Despachamos por la ruta óptima de última milla o grupaje, enviamos tracking en vivo al destinatario y procesamos devoluciones en menos de 24 h.',
  },
];

export interface WhyChooseUsItem {
  id: string;
  index: string;
  title: string;
  metricHighlight: string;
  description: string;
}

export const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    id: 'ahorro-costes',
    index: '01',
    title: 'Ahorro de costes estructurales',
    metricHighlight: 'Hasta -32% frente a almacén propio',
    description:
      'Transforma costes fijos (arrendamiento de nave, carretillas, licencias y personal en meses valle) en costes variables ligados exactamente a tus palets y envíos reales.',
  },
  {
    id: 'envios-24-48h',
    index: '02',
    title: 'Envíos garantizados en 24/48 h',
    metricHighlight: '98,6% índice OTIF peninsular',
    description:
      'Conexión directa desde los ejes viarios AP-7, C-58 y A-2 en Cataluña hacia las plataformas nacionales de clasificación nocturna y reparto capilar.',
  },
  {
    id: 'stock-online',
    index: '03',
    title: 'Seguimiento de stock online 24/7',
    metricHighlight: 'Visibilidad SKU, lote y serie',
    description:
      'Acceso permanente al portal SGA en la nube para auditar existencias disponibles, stock comprometido, entradas de proveedor y trazabilidad e-POD.',
  },
  {
    id: 'tarifas-volumen',
    index: '04',
    title: 'Tarifas escalables por volumen',
    metricHighlight: 'Economías de escala inmediatas',
    description:
      'Accede desde el primer envío a nuestras tarifas corporativas negociadas por gran volumen en transporte urgente, paletería y consumibles de embalaje.',
  },
];

export interface ImpactStat {
  value: string;
  label: string;
  context: string;
}

export const IMPACT_STATS: ImpactStat[] = [
  {
    value: '+1,2 M',
    label: 'Expediciones anuales gestionadas',
    context: 'Paquetería e-commerce B2C y paletería comercial B2B desde Cataluña',
  },
  {
    value: '99,84%',
    label: 'Exactitud de inventario y picking',
    context: 'Control mediante doble escaneo EAN/GS1 y pesaje dinámico en salida',
  },
  {
    value: '98,6%',
    label: 'Cumplimiento OTIF en 24/48 h',
    context: 'Entregas a tiempo y completas en primer intento en Península',
  },
  {
    value: '14.500 m²',
    label: 'Superficie logística operativa',
    context: 'Naves equipadas en CIM Vallès (Barcelona) y Riu Clar (Tarragona)',
  },
];

export interface ClientTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  resultSummary: string;
}

export const TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'botanica-mediterranea',
    quote:
      'Pasamos de preparar pedidos manualmente en un local propio con errores de lote a operar con control FEFO por radiofrecuencia en TransRomero. En campaña de Black Friday expedimos 900 pedidos diarios antes de las 18:30 h sin una sola rotura de servicio.',
    author: 'Laura Puigdemont Serra',
    role: 'Cofundadora y Directora General',
    company: 'Botánica Mediterránea S.L.',
    location: 'Barcelona',
    resultSummary: 'Control FEFO 100% · +38% recompra por entrega 24 h',
  },
  {
    id: 'electrohogar-pyme',
    quote:
      'Importamos pequeño electrodoméstico por el Puerto de Tarragona y utilizar su servicio NT-3PL-0104 con régimen de depósito aduanero y distribución paletizada nos permitió diferir el IVA de importación y rebajar un 29% nuestro coste logístico total.',
    author: 'Carlos Mendoza Ribas',
    role: 'Director de Operaciones y Compras',
    company: 'ElectroHogar Distribución S.L.',
    location: 'Tarragona',
    resultSummary: '-29% gasto logístico · Trazabilidad por nº de serie',
  },
  {
    id: 'atelier-vallesano',
    quote:
      'El protocolo de logística inversa RMA nos cambió el negocio: cada prenda devuelta se recepciona, revisa, reetiqueta y vuelve a figurar disponible en Shopify en menos de 24 horas, elevando la rotación de temporada un 19%.',
    author: 'Núria Casanovas Bosch',
    role: 'Responsable de E-Commerce y Supply Chain',
    company: 'Atelier Textil Vallesano',
    location: 'Sabadell (Barcelona)',
    resultSummary: 'Ciclo RMA < 24 h · +19% recuperación de margen',
  },
];

export interface BlogArticle {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  image: string;
  imageAlt: string;
  fallbackType: 'warehouse' | 'picking' | 'fleet';
  paragraphs: string[];
  technicalFormula: string;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'peso-tasable-factor-estiba',
    category: 'Transporte y Tarifación',
    date: '28 oct. 2026',
    readTime: '5 min de lectura',
    title: 'Cómo calcular el peso tasable y optimizar el factor de estiba en carretera y grupaje LCL',
    excerpt:
      'Comprender la relación entre peso bruto real y volumen ocupado evita sobrecostes ocultos en expediciones de mercancía ligera o voluminosa tanto en distribución nacional como en comercio exterior.',
    author: 'Oriol Mercader Prat',
    authorRole: 'Técnico Superior en Transporte y Jefe de Tráfico 3PL',
    image: maritimeContainerImg,
    imageAlt:
      'Pesaje en báscula industrial de palets y cajas de exportación junto a contenedor y tráiler en estación de grupaje',
    fallbackType: 'warehouse',
    paragraphs: [
      'En la contratación profesional del transporte de mercancías, el transportista o transitario factura siempre por el mayor valor entre el peso bruto real de la expedición y su peso volumétrico calculado según el factor de equivalencia de cada modo de transporte.',
      'En el transporte terrestre de mercancías por carretera (grupaje nacional e internacional CMR), el estándar industrial aplica la equivalencia 1 m³ = 333 kg (o 1.750 kg por metro lineal de plataforma ocupada). En cambio, en paquetería express e-commerce suele aplicarse 1 m³ = 200 o 250 kg, en carga aérea IATA 1 m³ = 167 kg, y en grupaje marítimo LCL 1 m³ = 1.000 kg (tonelada o metro cúbico, W/M).',
      'Reducir el aire interior de las cajas de envío mediante troqueles multi-altura en el puesto de packing disminuye el cubicaje total hasta un 22%, situando la expedición en un escalón tarifario inferior sin comprometer la resistencia a la compresión vertical (BCT).',
    ],
    technicalFormula:
      'Peso Volumétrico Carretera (kg) = Largo (m) × Ancho (m) × Alto (m) × 333 kg/m³ · Se factura máx(Peso Bruto, Peso Volumétrico).',
  },
  {
    id: 'etiquetado-gs1-128-trazabilidad',
    category: 'Ingeniería de Almacén (SGA)',
    date: '15 oct. 2026',
    readTime: '6 min de lectura',
    title: 'Estándar GS1-128 (SSCC) y criterios FIFO/FEFO en almacenes multicliente 3PL',
    excerpt:
      'La codificación mediante identificadores de aplicación permite automatizar la recepción en muelle, garantizar la trazabilidad sanitaria de lotes y eliminar errores en entregas a gran distribución.',
    author: 'Helena Vila Casals',
    authorRole: 'Responsable de Sistemas SGA y Calidad Operativa',
    image: warehouseRackingImg,
    imageAlt:
      'Control de stock mediante tablet industrial frente a europalets identificados con etiquetas logísticas GS1-128',
    fallbackType: 'warehouse',
    paragraphs: [
      'Cuando una pyme escala sus ventas hacia cadenas de distribución o mercados internacionales, la simple etiqueta de producto EAN-13 resulta insuficiente para gestionar unidades logísticas superiores como cajas máster o europalets.',
      'El estándar GS1-128 concatena múltiples Identificadores de Aplicación (IA) en un único código de barras lineal o DataMatrix: el IA (00) define el SSCC (Serial Shipping Container Code) como matrícula única mundial del palet, mientras que el IA (01) identifica el GTIN, el IA (10) el lote de fabricación y el IA (17) la fecha de caducidad.',
      'Al escanear una sola vez la etiqueta GS1-128 en nuestros muelles de recepción, el SGA valida automáticamente el pedido de compra, bloquea lotes en cuarentena si procede y ordena la extracción bajo regla FEFO (First Expired, First Out), indispensable en cosmética, parafarmacia y alimentación.',
    ],
    technicalFormula:
      'Estructura clave GS1-128: IA (00) Matrícula SSCC 18 dígitos + IA (01) GTIN Agrupación + IA (10) Lote + IA (17) Caducidad AAMMDD.',
  },
  {
    id: 'indicador-otif-logistica-inversa-rma',
    category: 'Fulfillment y Última Milla',
    date: '03 oct. 2026',
    readTime: '4 min de lectura',
    title: 'Maximizar el KPI OTIF y rentabilizar la logística inversa mediante protocolos RMA',
    excerpt:
      'Analizamos cómo medir con rigor el nivel de servicio logístico en comercio electrónico y cómo recuperar margen comercial acelerando el reacondicionamiento de devoluciones.',
    author: 'Marc Soldevila Riera',
    authorRole: 'Consultor de Operaciones E-Commerce y Última Milla',
    image: lastMileFleetImg,
    imageAlt:
      'Flota de camión semirremolque y furgonetas de última milla saliendo del centro de distribución en Cataluña',
    fallbackType: 'fleet',
    paragraphs: [
      'El indicador OTIF (On Time In Full) mide el porcentaje de pedidos que cumplen simultáneamente dos exigencias críticas: salir y entregarse dentro de la ventana temporal comprometida (On Time) y contener exactamente las referencias y unidades solicitadas en perfecto estado (In Full).',
      'En paralelo, las tiendas online de moda, calzado o electrónica registran tasas de devolución de entre el 12% y el 28%. Sin un circuito estructurado de autorización de retorno (RMA), la mercancía devuelta se acumula sin identificar y pierde valor comercial por cambio de temporada.',
      'Implantar un protocolo de triaje en menos de 24 horas desde la llegada del bulto al muelle permite clasificar automáticamente cada unidad en Grado A (reincorporación directa al stock vendible), Grado B (reacondicionamiento o canal outlet) o incidencia de garantía.',
    ],
    technicalFormula:
      'KPI OTIF (%) = (Pedidos entregados en plazo × Pedidos completos y sin daños) / Total pedidos expedidos × 100.',
  },
];

export type LegalDocKey = 'aviso-legal' | 'privacidad' | 'cookies';

export interface LegalDocument {
  key: LegalDocKey;
  title: string;
  updatedAt: string;
  sections: {
    heading: string;
    body: string;
  }[];
}

export const LEGAL_DOCUMENTS: Record<LegalDocKey, LegalDocument> = {
  'aviso-legal': {
    key: 'aviso-legal',
    title: 'Aviso Legal (Proyecto Académico de Logística 3PL)',
    updatedAt: 'Noviembre 2026',
    sections: [
      {
        heading: '1. Datos Identificativos y Carácter Formativo',
        body: 'Este portal web corresponde a una empresa ficticia denominada TransRomero Logística y Distribución, S.L. (NIF simulado B-67942180), desarrollada en el ámbito formativo de Grado Superior en Transporte, Logística y Comercio Internacional. Todos los productos técnicos, tarifas y datos de contacto tienen finalidad demostrativa.',
      },
      {
        heading: '2. Objeto de la Plataforma',
        body: 'Exponer de forma rigurosa el catálogo técnico de servicios logísticos 3PL (almacenaje paletizado y aduanero ADT/DDA, fulfillment omnicanal RF y distribución 24/48 h con logística inversa RMA), así como facilitar la solicitud simulada de presupuestos.',
      },
      {
        heading: '3. Propiedad Intelectual y Ausencia de Vínculo Contractual',
        body: 'Las fichas técnicas, referencias internas y simulaciones tarifarias mostradas reflejan estándares reales del sector logístico (UNE-EN 15635, GS1-128, LOTT, CMR e Incoterms® 2020), sin constituir oferta comercial vinculante.',
      },
    ],
  },
  privacidad: {
    key: 'privacidad',
    title: 'Política de Privacidad (Simulación Académica RGPD)',
    updatedAt: 'Noviembre 2026',
    sections: [
      {
        heading: '1. Procesamiento Local en el Navegador',
        body: 'Al tratarse de una aplicación web educativa, la información introducida en el formulario de contacto y solicitud de presupuesto se procesa exclusivamente en la memoria local del navegador para generar el acuse de recibo en pantalla, sin almacenarse en servidores externos ni cederse a terceros.',
      },
      {
        heading: '2. Marco Normativo de Referencia (RGPD y LOPDGDD)',
        body: 'En un entorno productivo real, el responsable trataría los datos profesionales con la finalidad de confeccionar estudios logísticos y cotizaciones B2B al amparo del artículo 6.1.b del Reglamento (UE) 2016/679, garantizando los derechos de acceso, rectificación, supresión y oposición.',
      },
    ],
  },
  cookies: {
    key: 'cookies',
    title: 'Política de Cookies (Simulación LSSI-CE)',
    updatedAt: 'Noviembre 2026',
    sections: [
      {
        heading: '1. Uso Exclusivo de Estado Técnico',
        body: 'Este sitio web no utiliza cookies publicitarias ni rastreadores comerciales de terceros. Únicamente emplea memoria de sesión del navegador para mantener la navegación fluida entre páginas y conservar preselecciones en el formulario de presupuesto.',
      },
    ],
  },
};
