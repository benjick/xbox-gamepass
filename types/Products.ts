export interface Remediation {
  RemediationId: string;
  Description: string;
}

export interface Affirmation {
  AffirmationId: string;
  AffirmationProductId: string;
  Description: string;
}

export interface EligibilityProperties {
  Remediations: Remediation[];
  Affirmations: Affirmation[];
}

export interface Image {
  FileId: string;
  EISListingIdentifier?: any;
  BackgroundColor: string;
  Caption: string;
  FileSizeInBytes: number;
  ForegroundColor: string;
  Height: number;
  ImagePositionInfo: string;
  ImagePurpose: string;
  UnscaledImageSHA256Hash: string;
  Uri: string;
  Width: number;
}

export interface PreviewImage {
  FileId: string;
  EISListingIdentifier?: any;
  BackgroundColor?: any;
  Caption: string;
  FileSizeInBytes: number;
  ForegroundColor?: any;
  Height: number;
  ImagePositionInfo?: any;
  ImagePurpose: string;
  UnscaledImageSHA256Hash: string;
  Uri: string;
  Width: number;
}

export interface Video {
  Uri: string;
  VideoPurpose: string;
  Height: number;
  Width: number;
  AudioEncoding: string;
  VideoEncoding: string;
  VideoPositionInfo: string;
  Caption: string;
  FileSizeInBytes: number;
  PreviewImage: PreviewImage;
  SortOrder: number;
}

export interface SearchTitle {
  SearchTitleString: string;
  SearchTitleType: string;
}

export interface LocalizedProperty {
  DeveloperName: string;
  PublisherName: string;
  PublisherWebsiteUri: string;
  SupportUri: string;
  EligibilityProperties: EligibilityProperties;
  Franchises: any[];
  Images: Image[];
  Videos: Video[];
  ProductDescription: string;
  ProductTitle: string;
  ShortTitle: string;
  SortTitle: string;
  FriendlyTitle?: any;
  ShortDescription: string;
  SearchTitles: SearchTitle[];
  VoiceTitle: string;
  RenderGroupDetails?: any;
  ProductDisplayRanks: any[];
  InteractiveModelConfig?: any;
  Interactive3DEnabled: boolean;
  Language: string;
  Markets: string[];
}

export interface ContentRating {
  RatingSystem: string;
  RatingId: string;
  RatingDescriptors: string[];
  RatingDisclaimers: string[];
  InteractiveElements: string[];
}

export interface RelatedProduct {
  RelatedProductId: string;
  RelationshipType: string;
}

export interface UsageData {
  AggregateTimeSpan: string;
  AverageRating: number;
  PlayCount: number;
  RatingCount: number;
  RentalCount: string;
  TrialCount: string;
  PurchaseCount: string;
}

export interface MarketProperty {
  OriginalReleaseDate: Date;
  MinimumUserAge: number;
  ContentRatings: ContentRating[];
  RelatedProducts: RelatedProduct[];
  UsageData: UsageData[];
  BundleConfig?: any;
  Markets: string[];
}

export interface Attribute {
  Name: string;
  Minimum?: number;
  Maximum?: number;
  ApplicablePlatforms: string[];
  Group?: any;
}

export interface SkuDisplayGroup {
  Id: string;
  Treatment: string;
}

export interface Properties {
  Attributes: Attribute[];
  CanInstallToSDCard: boolean;
  Category: string;
  Categories: string[];
  Subcategory?: any;
  IsAccessible: boolean;
  IsDemo: boolean;
  IsLineOfBusinessApp: boolean;
  IsPublishedToLegacyWindowsPhoneStore: boolean;
  IsPublishedToLegacyWindowsStore: boolean;
  PackageFamilyName: string;
  PackageIdentityName: string;
  PublisherCertificateName: string;
  PublisherId: string;
  SkuDisplayGroups: SkuDisplayGroup[];
  XboxLiveTier: string;
  XboxXPA?: any;
  XboxCrossGenSetId?: any;
  XboxConsoleGenOptimized: string[];
  XboxConsoleGenCompatible: string[];
  XboxLiveGoldRequired: boolean;
  ExtendedMetadata: string;
  XBOX?: any;
  OwnershipType?: any;
  PdpBackgroundColor: string;
  HasAddOns: boolean;
  RevisionId: Date;
  ProductGroupId: string;
  ProductGroupName: string;
  IsPrivateBeforeDateHint?: Date;
}

export interface AlternateId {
  IdType: string;
  Value: string;
}

export interface ValidationData {
  PassedValidation: boolean;
  RevisionId: string;
  ValidationResultUri: string;
}

export interface ProductPolicies {}

export interface LegalText {
  AdditionalLicenseTerms: string;
  Copyright: string;
  CopyrightUri: string;
  PrivacyPolicy: string;
  PrivacyPolicyUri: string;
  Tou: string;
  TouUri: string;
}

export interface LocalizedProperty2 {
  Contributors: any[];
  Features: string[];
  MinimumNotes: string;
  RecommendedNotes: string;
  ReleaseNotes: string;
  DisplayPlatformProperties?: any;
  SkuDescription: string;
  SkuTitle: string;
  SkuButtonTitle: string;
  DeliveryDateOverlay?: any;
  SkuDisplayRank: any[];
  TextResources?: any;
  Images: any[];
  LegalText: LegalText;
  Language: string;
  Markets: string[];
}

export interface MarketProperty2 {
  FirstAvailableDate: Date;
  SupportedLanguages: string[];
  PackageIds?: any;
  PIFilter?: any;
  Markets: string[];
}

export interface FulfillmentData {
  ProductId: string;
  WuBundleId: string;
  WuCategoryId: string;
  PackageFamilyName: string;
  SkuId: string;
  Content?: any;
  PackageFeatures?: any;
}

export interface HardwareProperties {
  MinimumHardware: string[];
  RecommendedHardware: string[];
  MinimumProcessor: string;
  RecommendedProcessor: string;
  MinimumGraphics: string;
  RecommendedGraphics: string;
}

export interface Application {
  ApplicationId: string;
  DeclarationOrder: number;
  Extensions: string[];
}

export interface FrameworkDependency {
  MaxTested: number;
  MinVersion: any;
  PackageIdentity: string;
}

export interface PlatformDependency {
  MaxTested: any;
  MinVersion: any;
  PlatformName: string;
}

export interface PackageDownloadUri {
  Rank: number;
  Uri: string;
}

export interface PackageFeatures {
  SupportsIntelligentDelivery: boolean;
  SupportsInstallFeatures: boolean;
  SupportsInstallRecipes: boolean;
}

export interface FulfillmentData2 {
  ProductId: string;
  WuBundleId: string;
  WuCategoryId: string;
  PackageFamilyName: string;
  SkuId: string;
  PackageContentId: string;
  Content?: any;
  PackageFeatures: PackageFeatures;
}

export interface Package {
  Applications: Application[];
  Architectures: string[];
  Capabilities: string[];
  DeviceCapabilities: any[];
  ExperienceIds: any[];
  FrameworkDependencies: FrameworkDependency[];
  HardwareDependencies: any[];
  HardwareRequirements: any[];
  Hash: string;
  HashAlgorithm: string;
  IsStreamingApp: boolean;
  Languages: string[];
  MaxDownloadSizeInBytes: any;
  MaxInstallSizeInBytes: any;
  PackageFormat: string;
  PackageFamilyName: string;
  MainPackageFamilyNameForDlc?: any;
  PackageFullName: string;
  PackageId: string;
  ContentId: string;
  KeyId: string;
  PackageRank: number;
  PackageUri: string;
  PlatformDependencies: PlatformDependency[];
  PlatformDependencyXmlBlob: string;
  ResourceId: string;
  Version: string;
  PackageDownloadUris: PackageDownloadUri[];
  DriverDependencies: any[];
  FulfillmentData: FulfillmentData2;
}

export interface Properties2 {
  EarlyAdopterEnrollmentUrl?: any;
  FulfillmentData: FulfillmentData;
  FulfillmentType: string;
  FulfillmentPluginId: string;
  HasThirdPartyIAPs: boolean;
  LastUpdateDate: Date;
  HardwareProperties: HardwareProperties;
  HardwareRequirements: any[];
  HardwareWarningList: string[];
  InstallationTerms: string;
  Packages: Package[];
  VersionString: string;
  SkuDisplayGroupIds: string[];
  XboxXPA: boolean;
  BundledSkus: any[];
  IsRepurchasable: boolean;
  SkuDisplayRank: number;
  DisplayPhysicalStoreInventory?: any;
  VisibleToB2BServiceIds: string[];
  AdditionalIdentifiers: any[];
  IsTrial: boolean;
  IsPreOrder: boolean;
  IsBundle: boolean;
}

export interface Sku {
  LastModifiedDate: Date;
  LocalizedProperties: LocalizedProperty2[];
  MarketProperties: MarketProperty2[];
  ProductId: string;
  Properties: Properties2;
  SkuASchema: string;
  SkuBSchema: string;
  SkuId: string;
  SkuType: string;
  RecurrencePolicy?: any;
  SubscriptionPolicyId?: any;
}

export interface AllowedPlatform {
  MaxVersion: any;
  MinVersion: number;
  PlatformName: string;
}

export interface ClientConditions {
  AllowedPlatforms: AllowedPlatform[];
}

export interface Conditions {
  ClientConditions: ClientConditions;
  EndDate: Date;
  ResourceSetIds: string[];
  StartDate: Date;
}

export interface PIFilter {
  ExclusionProperties: any[];
  InclusionProperties: any[];
}

export interface Price {
  CurrencyCode: string;
  IsPIRequired: boolean;
  ListPrice: number;
  MSRP: number;
  TaxType: string;
  WholesaleCurrencyCode: string;
  WholesalePrice: number;
}

export interface OrderManagementData {
  GrantedEntitlementKeys: any[];
  PIFilter: PIFilter;
  Price: Price;
  OrderManagementPolicyIdOverride: string;
  GeofencingPolicyId: string;
}

export interface Properties3 {
  OriginalReleaseDate: Date;
}

export interface Remediation2 {
  RemediationId: string;
  Type: string;
  BigId: string;
}

export interface SatisfyingEntitlementKey {
  EntitlementKeys: string[];
  LicensingKeyIds: string[];
  PreOrderReleaseDate?: Date;
}

export interface LicensingData {
  SatisfyingEntitlementKeys: SatisfyingEntitlementKey[];
}

export interface Availability {
  Actions: string[];
  AvailabilityASchema: string;
  AvailabilityBSchema: string;
  AvailabilityId: string;
  Conditions: Conditions;
  LastModifiedDate: Date;
  Markets: string[];
  OrderManagementData: OrderManagementData;
  Properties: Properties3;
  SkuId: string;
  DisplayRank: number;
  AlternateIds: AlternateId[];
  RemediationRequired: boolean;
  Remediations: Remediation2[];
  LicensingData: LicensingData;
  AffirmationId: string;
}

export interface DisplaySkuAvailability {
  Sku: Sku;
  Availabilities: Availability[];
}

export interface Product {
  LastModifiedDate: Date;
  LocalizedProperties: LocalizedProperty[];
  MarketProperties: MarketProperty[];
  ProductASchema: string;
  ProductBSchema: string;
  ProductId: string;
  Properties: Properties;
  AlternateIds: AlternateId[];
  DomainDataVersion?: any;
  IngestionSource: string;
  IsMicrosoftProduct: boolean;
  PreferredSkuId: string;
  ProductType: string;
  ValidationData: ValidationData;
  MerchandizingTags: any[];
  PartD: string;
  SandboxId: string;
  ProductFamily: string;
  SchemaVersion: string;
  IsSandboxedProduct: boolean;
  ProductKind: string;
  ProductPolicies: ProductPolicies;
  DisplaySkuAvailabilities: DisplaySkuAvailability[];
}
