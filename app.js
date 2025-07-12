// traits.js
const traits = ["外向度", "親和度", "認真盡責度", "經驗開放度", "情緒不穩定度"];
const traitEn = ["Extraversion", "Agreeableness", "Conscientiousness", "Openness", "Neuroticism"];
const traitLangMap = {
  "zh-HK": traits,
  "zh-TW": traits,
  "en-UK": traitEn
};
const traitKeyMap = {
  "外向度": "Extraversion",
  "親和度": "Agreeableness",
  "認真盡責度": "Conscientiousness",
  "經驗開放度": "Openness",
  "情緒不穩定度": "Neuroticism",
  "Extraversion": "Extraversion",
  "Agreeableness": "Agreeableness",
  "Conscientiousness": "Conscientiousness",
  "Openness": "Openness",
  "Neuroticism": "Neuroticism"
};

let responsesByLang = {
    "zh-HK": [],
    "zh-TW": [],
    "en-UK": []
};

// Initialise the answer array
function initResponses() {
    responsesByLang[currentLang] = Array(questions[currentLang].length).fill(null);
}

let currentLang = "zh-HK";
let responses = [];
let currentPage = 0;
const pageSize = 10;

document.getElementById("langSelector")?.addEventListener("change", e => {
    const prevLang = currentLang;
    currentLang = e.target.value;
    
    // Initialise the answer array if the new language has not already done so
    if (!responsesByLang[currentLang]) {
        responsesByLang[currentLang] = Array(questions[currentLang].length).fill(null);
    }
    
    // Keep the current page position, but make sure you don't exceed the number of questions in the new language
    const maxPage = Math.ceil(questions[currentLang].length / pageSize) - 1;
    currentPage = Math.min(currentPage, maxPage);
    
    renderQuestions();
    document.getElementById("results").style.display = "none";
});

// Chart.js
function ensureChartJS() {
    return new Promise((resolve) => {
        if (window.Chart) {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
        script.onload = resolve;
        document.head.appendChild(script);
    });
}

// Three.js
function ensureThreeJS() {
    return new Promise((resolve) => {
        if (window.THREE) {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = () => {
            // OrbitControls
            const controlsScript = document.createElement('script');
            controlsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            controlsScript.onload = resolve;
            document.head.appendChild(controlsScript);
            
            // Add OrbitControls
            THREE.OrbitControls = function(object, domElement) {
                this.object = object;
                this.domElement = domElement;
                this.enabled = true;
                this.target = new THREE.Vector3();
                this.minDistance = 0;
                this.maxDistance = Infinity;
                this.minZoom = 0;
                this.maxZoom = Infinity;
                this.minPolarAngle = 0;
                this.maxPolarAngle = Math.PI;
                this.minAzimuthAngle = -Infinity;
                this.maxAzimuthAngle = Infinity;
                this.enableDamping = false;
                this.dampingFactor = 0.05;
                this.enableZoom = true;
                this.zoomSpeed = 1.0;
                this.enableRotate = true;
                this.rotateSpeed = 1.0;
                this.enablePan = true;
                this.panSpeed = 1.0;
                this.screenSpacePanning = false;
                this.keyPanSpeed = 7.0;
                this.autoRotate = false;
                this.autoRotateSpeed = 2.0;
                this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };
                this.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
                this.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
                
                var scope = this;
                var changeEvent = { type: 'change' };
                var startEvent = { type: 'start' };
                var endEvent = { type: 'end' };
                
                var STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_PAN: 4, TOUCH_DOLLY_PAN: 5, TOUCH_DOLLY_ROTATE: 6 };
                var state = STATE.NONE;
                
                var EPS = 0.000001;
                var spherical = new THREE.Spherical();
                var sphericalDelta = new THREE.Spherical();
                var scale = 1;
                var panOffset = new THREE.Vector3();
                var zoomChanged = false;
                var rotateStart = new THREE.Vector2();
                var rotateEnd = new THREE.Vector2();
                var rotateDelta = new THREE.Vector2();
                var panStart = new THREE.Vector2();
                var panEnd = new THREE.Vector2();
                var panDelta = new THREE.Vector2();
                var dollyStart = new THREE.Vector2();
                var dollyEnd = new THREE.Vector2();
                var dollyDelta = new THREE.Vector2();
                
                this.update = function() {
                    var offset = new THREE.Vector3();
                    var quat = new THREE.Quaternion().setFromUnitVectors(object.up, new THREE.Vector3(0, 1, 0));
                    var quatInverse = quat.clone().invert();
                    var lastPosition = new THREE.Vector3();
                    var lastQuaternion = new THREE.Quaternion();
                    
                    return function update() {
                        var position = scope.object.position;
                        offset.copy(position).sub(scope.target);
                        offset.applyQuaternion(quat);
                        spherical.setFromVector3(offset);
                        
                        if (scope.autoRotate && state === STATE.NONE) {
                            rotateLeft(getAutoRotationAngle());
                        }
                        
                        spherical.theta += sphericalDelta.theta;
                        spherical.phi += sphericalDelta.phi;
                        spherical.theta = Math.max(scope.minAzimuthAngle, Math.min(scope.maxAzimuthAngle, spherical.theta));
                        spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));
                        spherical.makeSafe();
                        spherical.radius *= scale;
                        spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, spherical.radius));
                        
                        scope.target.add(panOffset);
                        offset.setFromSpherical(spherical);
                        offset.applyQuaternion(quatInverse);
                        position.copy(scope.target).add(offset);
                        scope.object.lookAt(scope.target);
                        
                        if (scope.enableDamping === true) {
                            sphericalDelta.theta *= (1 - scope.dampingFactor);
                            sphericalDelta.phi *= (1 - scope.dampingFactor);
                            panOffset.multiplyScalar(1 - scope.dampingFactor);
                        } else {
                            sphericalDelta.set(0, 0, 0);
                            panOffset.set(0, 0, 0);
                        }
                        
                        scale = 1;
                        
                        if (zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {
                            scope.dispatchEvent(changeEvent);
                            lastPosition.copy(scope.object.position);
                            lastQuaternion.copy(scope.object.quaternion);
                            zoomChanged = false;
                            return true;
                        }
                        
                        return false;
                    };
                }();
                
                function getAutoRotationAngle() {
                    return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
                }
                
                function rotateLeft(angle) {
                    sphericalDelta.theta -= angle;
                }
                
                // EventListener
                this.addEventListener = function(type, listener) {
                    if (!this._listeners) this._listeners = {};
                    if (!this._listeners[type]) this._listeners[type] = [];
                    this._listeners[type].push(listener);
                };
                
                this.dispatchEvent = function(event) {
                    if (!this._listeners) return;
                    var listeners = this._listeners[event.type];
                    if (listeners) {
                        listeners.forEach(function(listener) {
                            listener(event);
                        });
                    }
                };
                
                // MouseDownEvent
                function onMouseDown(event) {
                    if (scope.enabled === false) return;
                    event.preventDefault();
                    
                    if (event.button === scope.mouseButtons.LEFT) {
                        if (scope.enableRotate === false) return;
                        handleMouseDownRotate(event);
                        state = STATE.ROTATE;
                    }
                    
                    if (state !== STATE.NONE) {
                        document.addEventListener('mousemove', onMouseMove, false);
                        document.addEventListener('mouseup', onMouseUp, false);
                        scope.dispatchEvent(startEvent);
                    }
                }
                
                function onMouseMove(event) {
                    if (scope.enabled === false) return;
                    event.preventDefault();
                    
                    if (state === STATE.ROTATE) {
                        if (scope.enableRotate === false) return;
                        handleMouseMoveRotate(event);
                    }
                }
                
                function onMouseUp(event) {
                    if (scope.enabled === false) return;
                    document.removeEventListener('mousemove', onMouseMove, false);
                    document.removeEventListener('mouseup', onMouseUp, false);
                    scope.dispatchEvent(endEvent);
                    state = STATE.NONE;
                }
                
                function handleMouseDownRotate(event) {
                    rotateStart.set(event.clientX, event.clientY);
                }
                
                function handleMouseMoveRotate(event) {
                    rotateEnd.set(event.clientX, event.clientY);
                    rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
                    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
                    rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
                    sphericalDelta.phi -= 2 * Math.PI * rotateDelta.y / element.clientHeight;
                    rotateStart.copy(rotateEnd);
                    scope.update();
                }
                
                scope.domElement.addEventListener('mousedown', onMouseDown, false);
            };
        };
        document.head.appendChild(script);
    });
}

if (responses.length === 0) {
    responses = Array(questions[currentLang].length).fill(null);
}

document.getElementById("startBtn").addEventListener("click", function() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("app").style.display = "block";
    renderQuestions();
});

function updateStartScreen() {
    document.getElementById("title").innerText = texts[currentLang].title;
    document.getElementById("description").innerText = texts[currentLang].description;
    document.getElementById("startBtn").innerText = texts[currentLang].start;
}

function updateProgressBar() {
    const total = questions[currentLang].length;
    // Use the current language's answer array
    const answered = responsesByLang[currentLang].filter(r => r !== null).length;
    const percent = (answered / total) * 100;
    
    const progressEl = document.getElementById("progress");
    const progressText = document.getElementById("progressText");
    
    progressEl.style.width = `${percent}%`;
    progressText.textContent = `${Math.round(percent)}%`;
    
    if (percent >= 90) {
        progressEl.classList.add("active");
    } else {
        progressEl.classList.remove("active");
    }
}

function renderQuestions() {
    const container = document.getElementById("test");
    container.innerHTML = "";
    const start = currentPage * pageSize;
    const end = Math.min(start + pageSize, questions[currentLang].length);

    for (let i = start; i < end; i++) {
        const q = questions[currentLang][i];
        const div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `
            <p class="question-text">${i + 1}. ${q.q}</p>
            <div class="scale">
                ${[5, 4, 3, 2, 1].map(val => `
                    <label class="option">
                        <input type="radio" name="q${i}" value="${val}">
                        <span class="checkmark ${getCheckmarkColor(val)}"></span>
                        <span class="option-label">${getOptionLabel(val)}</span>
                    </label>
                `).join('')}
            </div>
        `;

        div.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener("change", (e) => {
                const qIndex = parseInt(radio.name.substring(1));
                responsesByLang[currentLang][qIndex] = e.target.value;
                updateProgressBar();

                div.querySelectorAll('.option-label').forEach(label => {
                    label.style.fontWeight = 'light';
                });
            });
        });

        container.appendChild(div);
    }
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "nav-buttons";

    if (currentPage > 0) {
        const prevPageBtn = document.createElement("button");
        prevPageBtn.className = "nav-button prev-button";
        prevPageBtn.innerHTML = `<i class="fas fa-arrow-left"></i> ${currentLang.startsWith("zh") ? "上一頁" : "Previous"}`;
        prevPageBtn.addEventListener("click", () => {
            currentPage--;
        renderQuestions();
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
        });
    });
        buttonContainer.appendChild(prevPageBtn);
    }

    if ((currentPage + 1) * pageSize < questions[currentLang].length) {
        const nextPageBtn = document.createElement("button");
        nextPageBtn.className = "nav-button next-button";
        nextPageBtn.innerHTML = `${currentLang.startsWith("zh") ? "下一頁" : "Next"} <i class="fas fa-arrow-right"></i>`;
        nextPageBtn.addEventListener("click", () => {
            currentPage++;
        renderQuestions();
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
        });
    });
        buttonContainer.appendChild(nextPageBtn);
    }

    if ((currentPage + 1) * pageSize >= questions[currentLang].length) {
    const submitBtn = document.createElement("button");
    submitBtn.className = "nav-button submit-button";
    submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> ${currentLang.startsWith("zh") ? "提交" : "Submit"}`;
    submitBtn.addEventListener("click", calculateResults);
    submitBtn.addEventListener("click", createConfetti);
    
    buttonContainer.appendChild(submitBtn);
}

    container.appendChild(buttonContainer);
    updateProgressBar();
}

function getCheckmarkColor(value) {
    return {
        5: "green",
        4: "light-green",
        3: "grey",
        2: "light-purple",
        1: "purple"
    }[value];
}

function getOptionLabel(value) {
    const labels = {
        "zh-HK": {
            5: "非常貼切",
            4: "有啲貼切", 
            3: "普通",
            2: "唔太貼切",
            1: "非常唔貼切"
        },
        "zh-TW": {
            5: "非常符合",
            4: "有點符合",
            3: "普通",
            2: "有點不符合",
            1: "非常不符合"
        },
        "en-UK": {
            5: "Very Accurate",
            4: "Moderately",
            3: "So-so",
            2: "Slightly",
            1: "Not at all"
        }
    };
    return labels[currentLang][value] || value;
}

async function calculateResults() {
  const scores = {};
  const counts = {};
  const questionSet = questions[currentLang];

  questionSet.forEach((q, i) => {
    const val = document.querySelector(`input[name='q${i}']:checked`);
    if (!val) return;
    const score = q.reverse ? 6 - Number(val.value) : Number(val.value);
    // Use traitKeyMap to convert current lang traits to Eng keys
    const englishTrait = traitKeyMap[q.trait];
    scores[englishTrait] = (scores[englishTrait] || 0) + score;
    counts[englishTrait] = (counts[englishTrait] || 0) + 1;
  });

  // Use traitEn ordering to ensure consistant result ordering
  const results = traitEn.map(trait => (scores[trait] || 0) / (counts[trait] || 1));

  const resultObj = {
    Extraversion: results[0],
    Agreeableness: results[1],
    Conscientiousness: results[2],
    Openness: results[3],
    Neuroticism: results[4]
  };

  // Get introvert / extravert percentage
const extraversionKey = "Extraversion";
const extraversionCount = counts[extraversionKey] || 1;
const maxExtraversionScore = extraversionCount * 5;
const rawScore = scores[extraversionKey] || 0;

const extravert = ((rawScore / maxExtraversionScore) * 100).toFixed(1);
const introvert = (100 - extravert).toFixed(1);

// Display the result
displayResults(resultObj);
saveToHistory(resultObj, introvert, extravert);
const extraInfoText = `${currentLang.startsWith("zh") ? "內向百分比" : "Introversion%"}: ${introvert}% | ${currentLang.startsWith("zh") ? "外向百分比" : "Extraversion%"}: ${extravert}%`;
const extraInfoTextEn = `Introvert: ${introvert}% | Extravert: ${extravert}%`;
  document.getElementById("extraInfo").innerText = extraInfoText;
  document.getElementById("extraInfo").dataset.english = extraInfoTextEn;

  document.getElementById("results").style.display = "block";
  document.getElementById("progress").style.width = "100%";
  document.getElementById("progressText").textContent = "100%";
  document.getElementById("progress").classList.add("active");
  renderHistory();

  // Render Chart
  await ensureChartJS();
  const ctx = document.getElementById('resultsChart').getContext('2d');
  if (window.myChart) window.myChart.destroy();

  const labelSet = traitLangMap[currentLang] || traitEn;
  const radarData = traitEn.map(trait => resultObj[trait]);

  window.myChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: labelSet,
        datasets: [{
            label: "BIG5 Result",
            data: radarData,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            pointBackgroundColor: "rgba(54, 162, 235, 1)"
        }]
    },
    options: {
        responsive: true,
        scales: {
            r: {
                min: 0,
                max: 5,
                ticks: {
                    stepSize: 1,
                    backdropColor: 'transparent'
                },
                angleLines: {
                    color: '#888'
                },
                grid: {
                    color: '#888'
                },
                pointLabels: {
                    color: function(context) {
                        return document.body.dataset.theme === 'dark' ? '#f1f1f1' : '#333';
                    }
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: function(context) {
                        return document.body.dataset.theme === 'dark' ? '#f1f1f1' : '#333';
                    }
                }
            }
        }
    }
});
}

function getResultText(trait, score, lang = currentLang) {
    const threshold = 3;
    const isHigh = score >= threshold;
    const status = isHigh ? 'high' : 'low';

    const translations = {
        "Neuroticism": {
            "high": {
                "en-UK": "Your score on Neuroticism is high, indicating you tend to experience negative emotions like anxiety or anger.",
                "zh-HK": "你嘅情緒不穩定度（Neuroticism）得分偏高，代表你容易出現焦慮、憤怒等負面情緒。",
                "zh-TW": "你的情緒不穩定度（Neuroticism）得分偏高，表示你較容易出現焦慮或憤怒等負面情緒。"
            },
            "low": {
                "en-UK": "Your score on Neuroticism is low, indicating you are calm and emotionally stable.",
                "zh-HK": "你嘅情緒不穩定度（Neuroticism）得分偏低，代表你冷靜、穩定，唔易受情緒困擾。",
                "zh-TW": "你的情緒不穩定度（Neuroticism）偏低，表示你冷靜、穩定，不容易受情緒影響。"
            },
            "description": {
                "en-UK": `Neuroticism refers to the tendency to experience negative feelings. People high in neuroticism tend to react more emotionally to everyday situations, often feeling anxious, angry or depressed. Their emotional responses can be intense and long-lasting, making it hard to stay calm or think clearly in stressful moments.`,
                "zh-HK": `情緒不穩定度講緊你有幾容易出現負面情緒，例如焦慮、憤怒或抑鬱。如果你得分偏高，可能會比起其他人更加易因為日常小事而感到激動，甚至會長時間保持負面情緒，影響思考同決策能力。`,
                "zh-TW": `情緒不穩定度指的是一你傾向於感受到負面情緒的程度。高神經質者容易對日常事件產生強烈情緒反應，可能常感焦慮、憤怒或沮喪，並且情緒持續時間較長，影響應對壓力與判斷能力。`
            }
        },
        "Extraversion": {
            "high": {
                "en-UK": "Your score on Extraversion is high, indicating you are sociable, energetic and outgoing.",
                "zh-HK": "你嘅外向度（Extraversion）得分偏高，代表你健談、有活力、鍾意社交。",
                "zh-TW": "你的外向度（Extraversion）得分偏高，表示你喜歡社交、充滿活力。"
            },
            "low": {
                "en-UK": "Your score on Extraversion is low, indicating you are introverted and enjoy solitude.",
                "zh-HK": "你嘅外向度（Extraversion）得分偏低，代表你比較內向，鍾意獨處。",
                "zh-TW": "你的外向度（Extraversion）得分偏低，表示你較內向，喜歡安靜與獨處。"
            },
            "description": {
                "en-UK": `Extraversion is about how outgoing and energetic someone is. Extraverts love socializing and often seek excitement, while introverts prefer calm environments and enjoy spending time alone.`,
                "zh-HK": `外向度講緊你有幾積極參與外在世界。外向人通常鍾意社交、充滿活力；內向人就鍾意靜態活動，獨處令佢哋覺得舒服。`,
                "zh-TW": `外向度描述你對外在世界的參與程度。外向者樂於與人互動，精力充沛；內向者則傾向安靜、喜歡獨處。`
            }
        },
        "Openness": {
            "high": {
                "en-UK": "Your score on Openness is high, indicating you are imaginative and open to new experiences.",
                "zh-HK": "你嘅經驗開放度（Openness）得分偏高，代表你有創意，樂於接受新事物。",
                "zh-TW": "你的經驗開放度（Openness）得分偏高，表示你富有想像力，樂於嘗試新體驗。"
            },
            "low": {
                "en-UK": "Your score on Openness is low, indicating you prefer simplicity and familiarity.",
                "zh-HK": "你嘅經驗開放度（Openness）得分偏低，代表你鍾意簡單、熟悉嘅事物。",
                "zh-TW": "你的經驗開放度（Openness）得分偏低，表示你偏好簡單熟悉的事物。"
            },
            "description": {
                "en-UK": `Openness relates to imagination, curiosity and interest in new experiences. High scorers enjoy arts, abstract thinking and novelty, while low scorers prefer tradition and clarity.`,
                "zh-HK": `開放度講緊你有幾樂於接觸新事物同發掘新諗法。得分高嘅人鍾意創作、藝術，對複雜事物感興趣；得分低嘅人偏向實際、傳統。`,
                "zh-TW": `開放度代表一個人對新事物的接受度與想像力。高分者富創意並愛冒險；低分者則偏好傳統與明確。`
            }
        },
        "Conscientiousness": {
            "high": {
                "en-UK": "Your score on Conscientiousness is high, indicating you are organised and self-disciplined.",
                "zh-HK": "你嘅認真盡責度（Conscientiousness）得分偏高，代表你有規律、有責任感。",
                "zh-TW": "你的認真盡責度（Conscientiousness）得分偏高，表示你做事有條理、有自律。"
            },
            "low": {
                "en-UK": "Your score on Conscientiousness is low, indicating you are more spontaneous and carefree.",
                "zh-HK": "你嘅認真盡責度（Conscientiousness）得分偏低，代表你比較隨性、冇咁緊張。",
                "zh-TW": "你的認真盡責度（Conscientiousness）得分偏低，表示你隨和不拘小節。"
            },
            "description": {
                "en-UK": `Conscientiousness is about being disciplined and reliable. High scorers are focused, responsible and plan ahead, while low scorers may be spontaneous and fun but sometimes disorganised.`,
                "zh-HK": `認真盡責度講緊你幾有責任感。得分高代表你做事有規劃、認真；低分就可能比較隨性，冇咁守規則。`,
                "zh-TW": `認真盡責度旨在衡量你做事是否有計畫與認真。高分者注重目標與紀律；低分者則較即興與自由。`
            }
        },
        "Agreeableness": {
            "high": {
                "en-UK": "Your score on Agreeableness is high, indicating you are compassionate and cooperative.",
                "zh-HK": "你嘅親和度（Agreeableness）得分偏高，代表你樂於助人、易於相處。",
                "zh-TW": "你的親和度（Agreeableness）得分偏高，表示你友善且樂於合作。"
            },
            "low": {
                "en-UK": "Your score on Agreeableness is low, indicating you are more direct and self-focused.",
                "zh-HK": "你嘅親和度（Agreeableness）得分偏低，代表你較為直接，注重自己需要。",
                "zh-TW": "你的親和度（Agreeableness）得分偏低，表示你比較直接，更注重自身。"
            },
            "description": {
                "en-UK": `Agreeableness is about kindness and cooperation. High scorers are empathetic and friendly, while low scorers are more assertive, direct and self-focused.`,
                "zh-HK": `親和度講緊你有幾樂於配合同理解人。高分代表你體貼、合作性強；低分就可能較自我、直接。`,
                "zh-TW": `親和度反映你是否樂於與人相處。高分者溫和友善；低分者較強勢、以自我為重。`
            }
        }
    };

    return {
        summary: translations[trait][status][lang],
        description: translations[trait].description[lang]
    };
}

function displayResults(traitsScoreObj, lang = currentLang) {
    for (const trait in traitsScoreObj) {
        const { summary, description } = getResultText(trait, traitsScoreObj[trait], lang);
        const card = document.getElementById(`${trait.toLowerCase()}-card`);
        if (card) {
            card.querySelector(".card-front").textContent = summary;
            card.querySelector(".card-back").textContent = description;
        }
        const summaryEl = document.getElementById(`${trait.toLowerCase()}-summary`);
        const descEl = document.getElementById(`${trait.toLowerCase()}-description`);
        if (summaryEl) summaryEl.textContent = summary;
        if (descEl) descEl.textContent = description;
    }
}

async function renderHeart(containerId, autoRotate = true) {
    await ensureThreeJS();
    
    const container = document.getElementById(containerId);
    if (!container) return;

    // Tip text only for footer
    if (containerId === "footerHeart3D") {
        const tipText = document.createElement("div");
        tipText.innerText = "Click, Drag & Play 點按並拖曳";
        tipText.style.position = "absolute";
        tipText.style.color = "#ff77aa";
        tipText.style.fontSize = "14px";
        tipText.style.fontWeight = "bold";
        tipText.style.fontFamily = "'Chiron Hei HK', sans-serif";
        tipText.style.textAlign = "center";
        tipText.style.width = "100%";
        tipText.style.top = "100%";
        tipText.style.left = "0";
        tipText.style.marginTop = "10px";
        tipText.style.animation = "blinkText 1s infinite alternate";
        container.style.position = "relative";
        container.appendChild(tipText);
    }

    // Build scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(250, 250);
    container.appendChild(renderer.domElement);

    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0, 2, -2, 2, -2, 0);
    shape.bezierCurveTo(-2, -2, 0, -2.5, 0, -4);
    shape.bezierCurveTo(0, -2.5, 2, -2, 2, 0);
    shape.bezierCurveTo(2, 2, 0, 2, 0, 0);

    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 1,
        bevelEnabled: true,
        bevelThickness: 0.3,
        bevelSize: 0.3,
        bevelSegments: 5
    });
    geometry.center();

    const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("hsl(340, 100%, 65%)"),
        metalness: 0.7,
        roughness: 0.2,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        reflectivity: 0.5
    });

    const backLight = new THREE.PointLight(0xffffff, 0.8, 100);
    backLight.position.set(0, 0, -10);
    scene.add(backLight);

    const heart = new THREE.Mesh(geometry, material);
    scene.add(heart);

    const light1 = new THREE.PointLight(0xff99cc, 1, 100);
    light1.position.set(5, 5, 5);
    const light2 = new THREE.PointLight(0xff3366, 1, 100);
    light2.position.set(-5, -5, 5);
    scene.add(light1, light2);

    const ambientLight = new THREE.AmbientLight(0x5f5f5f, 0.4);
    const spotLight = new THREE.SpotLight(0xff88bb, 1);
    spotLight.position.set(10, 10, 10);
    spotLight.castShadow = true;
    scene.add(ambientLight, spotLight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    camera.position.z = 7;

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2;

    if (containerId === "footerHeart3D") {
        let hasInteracted = false;
        const hideTip = () => {
            if (!hasInteracted) {
                hasInteracted = true;
                tipText.style.display = "none";
                controls.autoRotate = false;
            }
        };
        controls.addEventListener("start", hideTip);
        renderer.domElement.addEventListener("mousedown", hideTip);
        renderer.domElement.addEventListener("touchstart", hideTip);
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
}

// The necessary libraries are loaded during initalisation
document.addEventListener('DOMContentLoaded', async () => {
  initResponses(); //Initialise the answer array for the current language
  await ensureChartJS();
  await ensureThreeJS();
    // Start screen 3D heart
    renderHeart("startScreenHeart", true);
    
    // Footer 3D heart
    renderHeart("footerHeart3D", true);
    
    // Create floating particles effect
    createFloatingParticles();
});

// Create floating particles effect
function createFloatingParticles() {
    const particleContainer = document.querySelector('.floating-particles');
    if (!particleContainer) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (2 + Math.random() * 2) + 's';
        particleContainer.appendChild(particle);
    }
}

function createConfetti() {
            // Enhanced color palette that matches the site's gradient theme
            const colors = [
                '#667eea', '#764ba2', '#ff6b6b', '#4ecdc4', 
                '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b',
                '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e',
                '#00b894', '#00cec9', '#e84393', '#fd79a8'
            ];
            
            const confettiCount = 200; // More confetti for better effect
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // Enhanced random properties
                const size = Math.random() * 12 + 4; // Varied sizes
                const color = colors[Math.floor(Math.random() * colors.length)];
                const angle = Math.random() * Math.PI * 2; // Full circle spread
                const velocity = Math.random() * 8 + 6; // Varied speeds
                const gravity = Math.random() * 0.5 + 0.3; // Gravity effect
                const rotationSpeed = Math.random() * 10 + 5; // Rotation speed
                
                // Different shapes for variety
                const shapeType = Math.random();
                if (shapeType < 0.4) {
                    confetti.classList.add('circle');
                } else if (shapeType < 0.7) {
                    confetti.classList.add('triangle');
                    confetti.style.borderBottomColor = color;
                } else if (shapeType < 0.9) {
                    confetti.classList.add('star');
                    confetti.style.backgroundColor = color;
                } else {
                    // Rectangle (default)
                    confetti.style.backgroundColor = color;
                }
                
                // Set initial position at center
                confetti.style.left = `${centerX}px`;
                confetti.style.top = `${centerY}px`;
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                confetti.style.position = 'fixed';
                confetti.style.zIndex = '9999';
                confetti.style.transformOrigin = 'center center';
                
                // Add subtle shadow for depth
                confetti.style.boxShadow = `0 2px 6px rgba(0,0,0,0.2)`;
                
                document.body.appendChild(confetti);
                
                // Enhanced animation with realistic physics
                let progress = 0;
                let rotation = 0;
                const duration = 3000; // 3 seconds for longer effect
                const startTime = Date.now();
                
                // Initial velocity components
                let vx = Math.cos(angle) * velocity;
                let vy = Math.sin(angle) * velocity;
                let x = centerX;
                let y = centerY;
                
                function animate() {
                    const elapsed = Date.now() - startTime;
                    progress = elapsed / duration;
                    
                    if (progress < 1) {
                        // Apply physics
                        const deltaTime = 16; // Assume 60fps
                        
                        // Update position with velocity
                        x += vx * (deltaTime / 16);
                        y += vy * (deltaTime / 16);
                        
                        // Apply gravity
                        vy += gravity * (deltaTime / 16);
                        
                        // Air resistance
                        vx *= 0.99;
                        vy *= 0.99;
                        
                        // Update rotation
                        rotation += rotationSpeed * (deltaTime / 16);
                        
                        // Apply position and effects
                        confetti.style.left = `${x}px`;
                        confetti.style.top = `${y}px`;
                        confetti.style.transform = `rotate(${rotation}deg) scale(${1 - progress * 0.5})`;
                        confetti.style.opacity = Math.max(0, 1 - progress);
                        
                        // Continue animation
                        requestAnimationFrame(animate);
                    } else {
                        confetti.remove();
                    }
                }
                
                // Start animation with slight delay for wave effect
                setTimeout(() => {
                    requestAnimationFrame(animate);
                }, i * 2); // Staggered launch
            }
        }
        
async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    
    // Set the initial Y position
    let yPos = 15;
    
    // Username and title (multi-line supported)
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    const userName = document.getElementById("userName").value || "Anonymous";
    const titleLines = pdf.splitTextToSize(`${userName}'s Result from the \nBig Five Personality Test \n(Developed by NokHei)`, 180);
    
    // Calculate the height occupied by the title
    const titleHeight = titleLines.length * 7;
    
    // Render the title
    pdf.text(titleLines, 10, yPos);
    yPos += titleHeight + 5;
    
    // Date
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    const now = new Date();
    const testDate = now.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    pdf.text(`Test Date: ${testDate}`, 10, yPos);
    yPos += 10;
    
    // Trait Score Title
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("Trait Scores:", 10, yPos);
    yPos += 10;
    
    // Trait Score List
    pdf.setFont("helvetica", "normal");
    traitEn.forEach((t, i) => {
        const score = window.myChart.data.datasets[0].data[i];
        const percentage = (score / 5 * 100).toFixed(1);
        pdf.text(`${t}: ${percentage}%`, 10, yPos);
        yPos += 7;
    });
    
    // ExtraInfo
    const info = document.getElementById("extraInfo").dataset.english || "";
    yPos += 5;
    pdf.text(info, 10, yPos);
    yPos += 10;
    
    // Create a temporary canvas to export charts
    const canvas = document.getElementById('resultsChart');
    const exportCanvas = document.createElement('canvas');
    const size = 700;
    exportCanvas.width = size;
    exportCanvas.height = size;
    const ctx = exportCanvas.getContext('2d');
    
    // Force light mode bg styling
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    
    // Temporarily clone the chart and force light mode styling
    const tempChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: window.myChart.data.labels,
            datasets: [{
                ...window.myChart.data.datasets[0],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                pointBackgroundColor: 'rgba(54, 162, 235, 1)'
            }]
        },
        options: {
            responsive: false,
            scales: {
                r: {
                    min: 0,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        backdropColor: 'transparent',
                        color: '#333'
                    },
                    angleLines: {
                        color: 'rgba(100, 100, 100, 0.5)'
                    },
                    grid: {
                        color: 'rgba(100, 100, 100, 0.5)'
                    },
                    pointLabels: {
                        color: '#333'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Wait for the chart to render
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Render a temporary canvas
    tempChart.draw();
    
    // Convert to image URL
    const imageData = exportCanvas.toDataURL('image/png', 1.0);
    
    // Add chart to PDF (dynamically adjust according to current content position)
    const imgWidth = 120;
    const imgHeight = 120;
    pdf.addImage(imageData, 'PNG', 
        (pdf.internal.pageSize.getWidth() - imgWidth) / 2,
        yPos + 10, // Position according to current yPos
        imgWidth, 
        imgHeight);
    
    // Destroy the temporary chart
    tempChart.destroy();
    
    // PDF Footer
    const footerHeight = 12;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Footer BlackBg
    pdf.setFillColor(0, 0, 0);
    pdf.rect(0, pageHeight - footerHeight, pageWidth, footerHeight, 'F');

    // Footer WhiteText
    pdf.setFontSize(8);
    pdf.setTextColor(255, 255, 255);
    pdf.text("Generated by BIG5 Personality Test - https://nokhei.github.io/bigfivetest", 
        pageWidth / 2, 
        pageHeight - 3, 
        { align: 'center' });

    pdf.save(`big5_result_of_${userName}.pdf`);
}

function saveToHistory(resultObj, introvert, extravert) {
    const history = JSON.parse(localStorage.getItem("big5_history") || "[]");
    
    // Formatting the current date to British format
    const now = new Date();
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    let formattedDate = formatter.format(now)
        .replace(" at ", ", ")
        .replace("pm", "PM")
        .replace("am", "AM");

    history.unshift({
        date: formattedDate,
        results: resultObj,
        introvert,
        extravert
    });

    localStorage.setItem("big5_history", JSON.stringify(history.slice(0, 10)));
}

function renderHistory() {
    const historyList = document.getElementById("historyList");
    if (!historyList) return;
    
    const history = JSON.parse(localStorage.getItem("big5_history") || "[]");
    
    historyList.innerHTML = history.map(entry => `
        <div class="history-item">
            <div>${entry.date}</div>
            <div>${traitEn.map(trait => {
                const val = entry.results[trait];
                return `${trait}: ${(val / 5 * 100).toFixed(1)}%`;
            }).join(" | ")}</div>
            <div>Introvert: ${entry.introvert}% | Extravert: ${entry.extravert}%</div>
        </div>
    `).join("");
}

function clearHistory() {
    localStorage.removeItem("big5_history");
    renderHistory();
}

// EventListener
    document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("submitBtn")?.addEventListener("click", function(e) {
    console.log("Submit button clicked");
    createConfetti();
    calculateResults();
    });
    document.getElementById("pdfBtn")?.addEventListener("click", generatePDF);
    document.getElementById("clearHistoryBtn")?.addEventListener("click", clearHistory);
    document.getElementById("langSelector")?.addEventListener("change", e => {
        currentLang = e.target.value;
        currentPage = 0;
        renderQuestions();
        document.getElementById("results").style.display = "none";
    });

    document.getElementById("themeToggle")?.addEventListener("click", () => {
        const isDark = document.body.dataset.theme === "dark";
        document.body.dataset.theme = isDark ? "light" : "dark";
    });
    const submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
        submitBtn.addEventListener("click", function(e) {
            e.preventDefault();
            console.log("Submit clicked - creating confetti");
            createConfetti();
            calculateResults();
        });
    } else {
        console.error("Submit button not found!");
    }
    renderQuestions();
    renderHistory();
});
