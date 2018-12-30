<template>
    <div v-if="openbaseData" class="projects" v-show="showTopics">
        <table style="width: 110%; border: 0px; margin: 0px auto;">
            <tr>
                <th></th>
                <th>Code</th>
                <th>Version</th>
                <th>Nightly</th>
                <th>Release</th>
                <th>Style</th>
                <th>API</th>
            </tr>
            <tr v-for="project in projects" class="projects">
                <td>
                    <b>{{ project.label }}</b><br>
                </td>
                <td align="center">
                    <a target="_blank" :href="'https://github.com/openbase/' + project.id" style="color: inherit;">
                        <!--i class="fa fa-github fa-lg"></i-->
                        <font-awesome-icon icon="spinner" size="lg" />
                        <i class="fas fa-burn"></i>
                        Repo
                    </a>
                </td>
                <td align="center" valign="middle">
                    <a target="_blank"
                       :href="'https://search.maven.org/artifact/'+project.group+'/'+project.artifact">
                        <img style="width:134px;height:20px;" alt="Maven Central"
                             :src="'http://img.shields.io/maven-central/v/'+project.group+'/'+ project.artifact +'.svg?style=flat'"/>
                    </a>
                </td>
                <td align="center" valign="middle">
                    <a :target="_blank" :href="'https://travis-ci.org/openbase/'+project.id">
                        <img style="width:90px;height:20px;"
                             :src="'https://travis-ci.org/openbase/'+project.id+'.svg?branch=master'" alt="Master"/>
                    </a>
                </td>
                <td align="center" valign="middle">
                    <a target="_blank" :href="'https://travis-ci.org/openbase/'+project.id">
                        <img style="width:90px;height:20px;"
                             :src="'https://travis-ci.org/openbase/'+project.id+'.svg?branch=latest-stable'"
                             alt="LatestStable"/>
                    </a>
                </td>
                <td>
                    <a target="_blank"
                       :href="'https://www.codefactor.io/repository/github/openbase/'+project.id+'/overview/master'">
                        <img style="width:90px;height:20px;"
                             :src="'https://www.codefactor.io/repository/github/openbase/'+project.id+'/badge/master'"
                             alt="Codefactor"/>
                    </a>
                </td>
                <td align="center" valign="middle">
                    <a target="_blank" :href="'https://openbase.github.io/'+project.id +'/apidocs'"
                       style="color: inherit;">
                        <i class="fa fa-book fa-lg"></i>
                        API Doc
                    </a>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        data() {
            return {
                openbaseData: null,
                showTopics: true
            }
        },
        computed: {
            projects() {
                if (!this.openbaseData) return []
                return this.openbaseData.projects
            }
        },
        mounted() {
            console.log('load stuff')
            let url = '/openbase-data-old.json'

            fetch(url).then((resp) => {
                resp.json().then((json) => {
                    if (json.projects) {
                        this.openbaseData = json
                    }
                });
            }).catch((err) => {
                console.log('Failed fetching project list from - check above for CORS error messages')
            })
        }
    }
</script>
