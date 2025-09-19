<template>
    <q-page class="q-pa-md">
        <div class="content-container q-mx-auto">
            <div class="text-h3 text-center q-mb-xl">
                {{ contactUsFile?.label }}
            </div>

            <div class="row q-col-gutter-xl justify-center q-mb-xl">
                <div class="col-12 col-md-6">
                    <q-card flat bordered class="contact-card">
                        <q-card-section>
                            <div class="text-h6 q-mb-md">
                                {{ contactData?.companyName }}
                            </div>

                            <div class="contact-info q-mb-md">
                                <div>
                                    {{ contactData?.street }}
                                    {{ contactData?.housenumber }}
                                </div>
                                <div>
                                    {{ contactData?.postalCode }}
                                    {{ contactData?.city }}
                                </div>
                                <div>{{ contactData?.country }}</div>
                            </div>

                            <div class="contact-details q-mb-md">
                                <div>Tel: <a :href="'tel:' + contactData?.phoneNumber" class="text-black">{{
                                        contactData?.phoneNumber }}</a></div>
                                <div>Fax: {{ contactData?.faxNumber }}</div>
                                <div>E-Mail: <a :href="'mailto:' + contactData?.email" class="text-black">{{
                                        contactData?.email }}</a></div>
                            </div>

                            <div class="opening-hours q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">
                                    Öffnungszeiten:
                                </div>
                                <div v-html="contactData?.openingTimes"></div>
                            </div>

                            <div class="social-links q-mt-md">
                                <div class="text-h5 q-mb-md">
                                    Folgen Sie uns!
                                </div>
                                <div class="row q-gutter-md">
                                    <q-btn v-if="contactData?.facebook" flat type="a" :href="contactData.facebook"
                                        target="_blank" class="social-btn">
                                        <div class="social-media-icon">
                                            <svg width="40" height="40" viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M11,10h2.6l0.4-3H11V5.3c0-0.9,0.2-1.5,1.5-1.5H14V1.1c-0.3,0-1-0.1-2.1-0.1C9.6,1,8,2.4,8,5v2H5.5v3H8v8h3V10z" />
                                            </svg>
                                            <span>Facebook</span>
                                        </div>
                                    </q-btn>

                                    <q-btn v-if="contactData?.instagram" flat type="a" :href="contactData.instagram"
                                        target="_blank" class="social-btn">
                                        <div class="social-media-icon">
                                            <svg width="40" height="40" viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M13.55,1H6.46C3.45,1,1,3.44,1,6.44v7.12c0,3,2.45,5.44,5.46,5.44h7.08c3.02,0,5.46-2.44,5.46-5.44V6.44 C19.01,3.44,16.56,1,13.55,1z M17.5,14c0,1.93-1.57,3.5-3.5,3.5H6c-1.93,0-3.5-1.57-3.5-3.5V6c0-1.93,1.57-3.5,3.5-3.5h8 c1.93,0,3.5,1.57,3.5,3.5V14z" />
                                                <circle cx="14.87" cy="5.26" r="1.09" />
                                                <path
                                                    d="M10.03,5.45c-2.55,0-4.63,2.06-4.63,4.6c0,2.55,2.07,4.61,4.63,4.61c2.56,0,4.63-2.061,4.63-4.61 C14.65,7.51,12.58,5.45,10.03,5.45L10.03,5.45L10.03,5.45z M10.08,13c-1.66,0-3-1.34-3-2.99c0-1.65,1.34-2.99,3-2.99s3,1.34,3,2.99 C13.08,11.66,11.74,13,10.08,13L10.08,13L10.08,13z" />
                                            </svg>
                                            <span>Instagram</span>
                                        </div>
                                    </q-btn>
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </div>

                <!-- Contact Form - Második helyen -->
                <div class="col-12 col-md-6">
                    <q-card flat bordered class="contact-card">
                        <q-card-section>
                            <div class="text-h6 q-mb-md q-ml-md">
                                Kontaktformular
                            </div>
                            <q-form @submit="onSubmit" class="q-gutter-md">
                                <q-input v-model="formData.name" :label="getContentById(ELEMENT_IDS.NAME_LABEL)
                                    " outlined required />

                                <q-input v-model="formData.email" :label="getContentById(ELEMENT_IDS.EMAIL_LABEL)
                                    " outlined type="email" required />

                                <q-input v-model="formData.message" :label="getContentById(
                                    ELEMENT_IDS.INQUIRY_LABEL
                                )
                                    " type="textarea" outlined required rows="6" />

                                <div class="text-caption q-mb-md">
                                    {{
                                        getContentById(
                                            ELEMENT_IDS.PRIVACY_NOTICE
                                        )
                                    }}
                                </div>

                                <div class="row justify-end">
                                    <q-btn label="Senden" type="submit" color="primary" :loading="isSending" />
                                </div>
                            </q-form>
                        </q-card-section>
                    </q-card>
                </div>

                <!-- Map Card - Harmadik helyen -->
                <div class="col-12">
                    <q-card flat bordered class="map-card">
                        <q-card-section>
                            <div class="text-subtitle2 q-mb-sm">
                                {{
                                    getContentById(ELEMENT_IDS.PUBLIC_TRANSPORT)
                                }}
                            </div>
                            <div class="q-mb-md">
                                {{ getContentById(ELEMENT_IDS.DIRECTIONS) }}
                            </div>
                            <div class="map-container">
                                <iframe :src="contactData?.map" width="100%" height="450" style="border: 0"
                                    allowfullscreen="" loading="lazy"
                                    referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useFileStore } from 'src/stores/file-store';
import { useRouter } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import { request } from 'src/apollo/mutations/request';
import { useQuasar } from 'quasar';

const ELEMENT_IDS = {
    PUBLIC_TRANSPORT: 'eca31a02-35b6-4565-8410-84766adbf43f',
    DIRECTIONS: 'db7020c6-52a8-477f-9610-4778d80bfe80',
    PRIVACY_NOTICE: '1cf13666-4a5b-49c1-b657-7f83d7db0c7b',
    INQUIRY_LABEL: 'd141ea72-df82-430d-ad99-b4f50c31186f',
    NAME_LABEL: 'b89809ab-0eba-42aa-ae80-32e57646374e',
    EMAIL_LABEL: '39fa1245-3ff8-4fa3-ae05-645fbb46564e',
} as const;

const router = useRouter();
const fileStore = useFileStore();
const contactUsFile = ref<any>(null);

const contactData = computed(() => contactUsFile.value?.relatedFiles[0]);

const getContentById = (elementId: string): string => {
    if (!contactUsFile.value?.data) return '';

    const element = contactUsFile.value.data.find(
        (item: any) => item.elementId === elementId
    );

    return element?.data.content || '';
};

onMounted(async () => {
    contactUsFile.value = await fileStore.getFileById(
        router.currentRoute.value.path.split('/')[2]
    );
});

// Form data
const formData = ref({
    name: '',
    email: '',
    message: '',
});

const $q = useQuasar();
const { mutate: sendRequest, loading: isSending } = useMutation(request);

const onSubmit = async () => {
    console.log(formData.value);
    try {
        const response = await sendRequest({
            request: formData.value.message,
            name: formData.value.name,
            email: formData.value.email,
        });

        if (response?.data?.customerRequest) {
            $q.notify({
                type: 'positive',
                message: 'Ihre Nachricht wurde erfolgreich gesendet!',
                position: 'center',
            });

            formData.value = {
                name: '',
                email: '',
                message: '',
            };
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        $q.notify({
            type: 'negative',
            message:
                'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
            position: 'center',
        });
    }
};
</script>

<style lang="scss" scoped>
.content-container {
    max-width: 1200px;
}

.contact-card,
.map-card {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.contact-info,
.contact-details,
.opening-hours {
    line-height: 1.6;
}

.social-links {
    .social-btn {
        padding: 8px 16px;

        &:hover {
            opacity: 0.8;
        }
    }

    .social-media-icon {
        display: flex;
        flex-direction: column;
        align-items: center;

        svg {
            fill: currentColor;
            margin-bottom: 4px;
        }

        span {
            font-size: 0.9rem;
        }
    }
}

.map-container {
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    margin: 16px 0;
}

.form-container {
    max-width: 1200px;
    margin: 0 auto;

    @media (min-width: 1024px) {
        max-width: 800px;
    }

    @media (max-width: 1023px) {
        max-width: 100%;
    }
}

.q-form {
    margin: 0 auto;
    width: 100%;

    @media (min-width: 1024px) {
        max-width: 600px;
    }
}
</style>
