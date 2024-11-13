<template>
    <q-page class="q-pa-md">
        <div class="content-container q-mx-auto">
            <div class="text-h3 text-center q-mb-xl">Kontakt</div>

            <!-- Felső sor: Kapcsolati információk és Űrlap -->
            <div class="row q-col-gutter-xl justify-center q-mb-xl">
                <!-- Bal oldal: Kapcsolati információk -->
                <div class="col-12 col-md-6">
                    <q-card flat bordered class="contact-card">
                        <q-card-section>
                            <div class="text-h6 q-mb-md">
                                {{ contactUsFile?.relatedFiles[0].companyName }}
                            </div>

                            <div class="contact-info q-mb-md">
                                <div>
                                    {{ contactUsFile?.relatedFiles[0].street }}
                                    {{
                                        contactUsFile?.relatedFiles[0]
                                            .housenumber
                                    }}
                                </div>
                                <div>
                                    {{
                                        contactUsFile?.relatedFiles[0]
                                            .postalCode
                                    }}
                                    {{ contactUsFile?.relatedFiles[0].city }}
                                </div>
                                <div>
                                    {{ contactUsFile?.relatedFiles[0].country }}
                                </div>
                            </div>

                            <div class="contact-details q-mb-md">
                                <div>
                                    Tel:
                                    {{
                                        contactUsFile?.relatedFiles[0]
                                            .phoneNumber
                                    }}
                                </div>
                                <div>
                                    Fax:
                                    {{
                                        contactUsFile?.relatedFiles[0].faxNumber
                                    }}
                                </div>
                                <div>
                                    E-Mail:
                                    {{ contactUsFile?.relatedFiles[0].email }}
                                </div>
                            </div>

                            <div class="opening-hours q-mb-md">
                                <div class="text-weight-medium q-mb-sm">
                                    Öffnungszeiten:
                                </div>
                                <div>
                                    {{
                                        contactUsFile?.relatedFiles[0]
                                            .openingTimes
                                    }}
                                </div>
                            </div>

                            <div class="social-links">
                                <q-btn
                                    v-if="
                                        contactUsFile?.relatedFiles[0].facebook
                                    "
                                    flat
                                    round
                                    color="primary"
                                    icon="fab fa-facebook"
                                    type="a"
                                    :href="
                                        contactUsFile?.relatedFiles[0].facebook
                                    "
                                    target="_blank"
                                />
                                <q-btn
                                    v-if="
                                        contactUsFile?.relatedFiles[0].instagram
                                    "
                                    flat
                                    round
                                    color="primary"
                                    icon="fab fa-instagram"
                                    type="a"
                                    :href="
                                        contactUsFile?.relatedFiles[0].instagram
                                    "
                                    target="_blank"
                                />
                            </div>
                        </q-card-section>
                    </q-card>
                </div>

                <!-- Jobb oldal: Kapcsolati űrlap -->
                <div class="col-12 col-md-6">
                    <q-card flat bordered class="contact-card">
                        <q-card-section>
                            <div class="text-h6 q-mb-lg">Kontaktformular</div>
                            <q-form @submit="onSubmit" class="q-gutter-md">
                                <q-input
                                    outlined
                                    v-model="name"
                                    :label="
                                        contactUsFile?.data[4]?.data?.content
                                    "
                                    lazy-rules
                                />

                                <q-input
                                    outlined
                                    v-model="email"
                                    :label="
                                        contactUsFile?.data[5]?.data?.content
                                    "
                                    lazy-rules
                                    type="email"
                                />

                                <q-input
                                    outlined
                                    v-model="message"
                                    type="textarea"
                                    :label="
                                        contactUsFile?.data[3]?.data?.content
                                    "
                                    lazy-rules
                                />

                                <div class="text-caption q-mb-md">
                                    {{ contactUsFile?.data[2]?.data?.content }}
                                </div>

                                <q-btn
                                    label="Senden"
                                    type="submit"
                                    color="primary"
                                />
                            </q-form>
                        </q-card-section>
                    </q-card>
                </div>
            </div>

            <!-- Alsó sor: Térkép középen -->
            <div class="row justify-center">
                <div class="col-12 col-md-8">
                    <q-card flat bordered class="map-card">
                        <q-card-section>
                            <div class="text-h6 q-mb-md">Anfahrt</div>
                            <div class="text-body1 q-mb-md">
                                {{ contactUsFile?.data[0]?.data?.content }}
                            </div>
                            <div class="text-body2 q-mb-md">
                                {{ contactUsFile?.data[1]?.data?.content }}
                            </div>

                            <!-- Google Maps iframe -->
                            <div class="map-container">
                                <iframe
                                    width="100%"
                                    height="400"
                                    style="border: 0"
                                    loading="lazy"
                                    allowfullscreen
                                    :src="
                                        getEmbedUrl(
                                            contactUsFile?.relatedFiles[0].map
                                        )
                                    "
                                ></iframe>
                            </div>
                        </q-card-section>
                        <q-card-section>
                            <q-btn
                                color="primary"
                                icon="place"
                                label="In Google Maps öffnen"
                                type="a"
                                :href="contactUsFile?.relatedFiles[0].map"
                                target="_blank"
                            />
                        </q-card-section>
                    </q-card>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFileStore } from 'src/stores/file-store';

const fileStore = useFileStore();
const contactUsFile = ref<any>(null);

const name = ref('');
const email = ref('');
const message = ref('');

onMounted(async () => {
    contactUsFile.value = await fileStore.getFileById(
        'b6f6f64d-5847-46f2-ae7c-c07a24cce7fd'
    );
});

const onSubmit = () => {
    // Implement form submission logic here
    console.log('Form submitted:', {
        name: name.value,
        email: email.value,
        message: message.value,
    });
};

const getEmbedUrl = (mapUrl: string) => {
    if (!mapUrl) return '';
    // Példa URL: https://www.google.com/maps/place/Lebenskreis+Apotheke/@47.192576,14.74437,15z/...
    // Átalakítjuk embed URL-lé
    return mapUrl.replace(
        '/maps/place/',
        '/maps/embed/v1/place?key=YOUR_API_KEY&q='
    );
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
    .q-btn {
        margin-right: 8px;
    }
}

// Egyforma magasságú kártyák
.q-card {
    display: flex;
    flex-direction: column;

    .q-card__section {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    form {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
}

.map-container {
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    margin: 16px 0;
}
</style>
