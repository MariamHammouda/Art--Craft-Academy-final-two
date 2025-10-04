import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/")}
              className="text-[#59ACBE] hover:text-[#FCD11A] font-medium transition-colors duration-200"
            >
              ← {t('common.backToHome')}
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('privacy.title')}</h1>
            <p className="text-gray-600 text-lg">{t('privacy.subtitle')}</p>
            <p className="text-sm text-gray-500 mt-2">{t('privacy.lastUpdated')}: {t('privacy.updateDate')}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="prose max-w-none">
            
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('privacy.introduction.title')}</h2>
              <p className="text-gray-600 mb-4">{t('privacy.introduction.content1')}</p>
              <p className="text-gray-600">{t('privacy.introduction.content2')}</p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('privacy.informationCollected.title')}</h2>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">{t('privacy.informationCollected.personalInfo.title')}</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>{t('privacy.informationCollected.personalInfo.name')}</li>
                <li>{t('privacy.informationCollected.personalInfo.email')}</li>
                <li>{t('privacy.informationCollected.personalInfo.phone')}</li>
                <li>{t('privacy.informationCollected.personalInfo.address')}</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">{t('privacy.informationCollected.usageData.title')}</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>{t('privacy.informationCollected.usageData.ipAddress')}</li>
                <li>{t('privacy.informationCollected.usageData.browserInfo')}</li>
                <li>{t('privacy.informationCollected.usageData.pageViews')}</li>
                <li>{t('privacy.informationCollected.usageData.timeSpent')}</li>
                <li>{t('privacy.informationCollected.usageData.clickData')}</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">{t('privacy.informationCollected.cookies.title')}</h3>
              <p className="text-gray-600">{t('privacy.informationCollected.cookies.content')}</p>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('privacy.howWeUse.title')}</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>{t('privacy.howWeUse.provideServices')}</li>
                <li>{t('privacy.howWeUse.improveServices')}</li>
                <li>{t('privacy.howWeUse.communication')}</li>
                <li>{t('privacy.howWeUse.personalization')}</li>
                <li>{t('privacy.howWeUse.analytics')}</li>
                <li>{t('privacy.howWeUse.legal')}</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('privacy.informationSharing.title')}</h2>
              <p className="text-gray-600 mb-4">{t('privacy.informationSharing.intro')}</p>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">{t('privacy.informationSharing.serviceProviders.title')}</h3>
              <p className="text-gray-600 mb-4">{t('privacy.informationSharing.serviceProviders.content')}</p>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">{t('privacy.informationSharing.legal.title')}</h3>
              <p className="text-gray-600 mb-4">{t('privacy.informationSharing.legal.content')}</p>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">{t('privacy.informationSharing.businessTransfer.title')}</h3>
              <p className="text-gray-600">{t('privacy.informationSharing.businessTransfer.content')}</p>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('privacy.dataSecurity.title')}</h2>
              <p className="text-gray-600 mb-4">{t('privacy.dataSecurity.content1')}</p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>{t('privacy.dataSecurity.encryption')}</li>
                <li>{t('privacy.dataSecurity.accessControls')}</li>
                <li>{t('privacy.dataSecurity.regularAudits')}</li>
                <li>{t('privacy.dataSecurity.secureServers')}</li>
              </ul>
              <p className="text-gray-600">{t('privacy.dataSecurity.content2')}</p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('privacy.yourRights.title')}</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>{t('privacy.yourRights.access.title')}:</strong> {t('privacy.yourRights.access.content')}</li>
                <li><strong>{t('privacy.yourRights.correction.title')}:</strong> {t('privacy.yourRights.correction.content')}</li>
                <li><strong>{t('privacy.yourRights.deletion.title')}:</strong> {t('privacy.yourRights.deletion.content')}</li>
                <li><strong>{t('privacy.yourRights.portability.title')}:</strong> {t('privacy.yourRights.portability.content')}</li>
                <li><strong>{t('privacy.yourRights.objection.title')}:</strong> {t('privacy.yourRights.objection.content')}</li>
              </ul>
            </section>

            {/* Cookies Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('privacy.cookies.title')}</h2>
              <p className="text-gray-600 mb-4">{t('privacy.cookies.intro')}</p>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">{t('privacy.cookies.types.title')}</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li><strong>{t('privacy.cookies.types.essential.title')}:</strong> {t('privacy.cookies.types.essential.content')}</li>
                <li><strong>{t('privacy.cookies.types.performance.title')}:</strong> {t('privacy.cookies.types.performance.content')}</li>
                <li><strong>{t('privacy.cookies.types.functional.title')}:</strong> {t('privacy.cookies.types.functional.content')}</li>
                <li><strong>{t('privacy.cookies.types.targeting.title')}:</strong> {t('privacy.cookies.types.targeting.content')}</li>
              </ul>
              
              <p className="text-gray-600">{t('privacy.cookies.management')}</p>
            </section>

            {/* Third-Party Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('privacy.thirdParty.title')}</h2>
              <p className="text-gray-600 mb-4">{t('privacy.thirdParty.intro')}</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li><strong>YouTube:</strong> {t('privacy.thirdParty.youtube')}</li>
                <li><strong>Google Analytics:</strong> {t('privacy.thirdParty.analytics')}</li>
                <li><strong>Payment Processors:</strong> {t('privacy.thirdParty.payments')}</li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('privacy.children.title')}</h2>
              <p className="text-gray-600">{t('privacy.children.content')}</p>
            </section>

            {/* International Transfers */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('privacy.international.title')}</h2>
              <p className="text-gray-600">{t('privacy.international.content')}</p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('privacy.retention.title')}</h2>
              <p className="text-gray-600">{t('privacy.retention.content')}</p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('privacy.changes.title')}</h2>
              <p className="text-gray-600">{t('privacy.changes.content')}</p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('privacy.contact.title')}</h2>
              <p className="text-gray-600 mb-4">{t('privacy.contact.intro')}</p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-[#59ACBE] mb-3">{t('privacy.contact.details')}</h3>
                <p className="text-gray-600 mb-2"><strong>{t('privacy.contact.email')}:</strong> privacy@artcraftacademy.com</p>
                <p className="text-gray-600 mb-2"><strong>{t('privacy.contact.address')}:</strong> Art Craft Academy, 123 Creative Street, Art City, AC 12345</p>
                <p className="text-gray-600"><strong>{t('privacy.contact.phone')}:</strong> +1 (555) 123-4567</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
