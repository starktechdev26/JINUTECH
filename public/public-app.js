'use strict';

document.addEventListener("DOMContentLoaded", () => {
    // 1. Typing Effect for Hero Section
    const phrases = [
        "Full-Stack Architect",
        "Mobile Security Innovator",
        "Python Specialist",
        "BCA Graduate"
    ];
    let tIdx = 0, tCharIdx = 0, tDeleting = false;
    const typewriterElement = document.getElementById("typewriter");

    function typeLoop() {
        if (!typewriterElement) return;
        const currentPhrase = phrases[tIdx];
        
        if (!tDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, tCharIdx + 1);
            tCharIdx++;
            if (tCharIdx === currentPhrase.length) { tDeleting = true; setTimeout(typeLoop, 1500); return; }
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, tCharIdx - 1);
            tCharIdx--;
            if (tCharIdx === 0) { tDeleting = false; tIdx = (tIdx + 1) % phrases.length; setTimeout(typeLoop, 500); return; }
        }
        setTimeout(typeLoop, tDeleting ? 40 : 80);
    }
    setTimeout(typeLoop, 1000);

    // 2. Intersection Observer for Scroll Reveals
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    // 3. Matrix Terminal Logger Helper
    function appendTerminalRow(text, isHighlight = false) {
        const consoleBody = document.getElementById('matrix-console');
        if (!consoleBody) return;
        const row = document.createElement('div');
        row.className = `term-row ${isHighlight ? 'text-highlight' : 'text-mute'}`;
        row.textContent = `> ${text}`;
        consoleBody.appendChild(row);
        consoleBody.scrollTop = consoleBody.scrollHeight;
    }

    // 4. Avengers Assemble Protocol
    const assembleBtn = document.getElementById('assemble-btn');
    if (assembleBtn) {
        assembleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const bannerText = document.getElementById('protocol-status-text');
            const indicator = document.querySelector('.status-indicator-node');
            const nodes = document.querySelectorAll('.agent-node');
            
            if (indicator) indicator.classList.add('active');
            if (bannerText) bannerText.textContent = "ACTIVATING AVENGERS PROTOCOL // INITIALIZING ROLL CALL";
            
            appendTerminalRow("Avengers assemble. Orchestrating roll call...", true);
            
            nodes.forEach((node, index) => {
                setTimeout(() => {
                    node.classList.add('activated');
                    const agentName = node.getAttribute('data-agent');
                    const logMessage = node.getAttribute('data-log');
                    
                    if (bannerText) bannerText.textContent = `ORCHESTRATING PROTOCOLS // AGENT [${agentName}] ONLINE`;
                    appendTerminalRow(logMessage, true);
                    
                    if (index === nodes.length - 1 && bannerText) {
                        setTimeout(() => {
                            bannerText.textContent = "AVENGERS PROTOCOL ASSEMBLED // FULL CAPACITY";
                            appendTerminalRow("Operational Assembly Complete.", true);
                        }, 800);
                    }
                }, index * 1000);
            });
        });
    }

    // 5. Limited Voice Input (Visual/Easter Egg Only on Public Side)
    const micBtn = document.getElementById('mic-btn');
    const micIcon = document.querySelector('#mic-btn i');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (micBtn && SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        
        recognition.onstart = () => {
            micBtn.classList.add('listening');
            micIcon.className = 'fas fa-microphone';
            appendTerminalRow("Public Comm-Link open. Awaiting audio...", true);
        };
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            appendTerminalRow(`Guest Audio: "${transcript}"`, false);
            
            if (transcript.includes("assemble")) {
                assembleBtn.click();
            } else {
                appendTerminalRow("Command unrecognized in public sector. Encryption required.", false);
            }
        };
        
        recognition.onend = () => {
            micBtn.classList.remove('listening');
            micIcon.className = 'fas fa-microphone-slash';
        };

        micBtn.addEventListener('click', () => { recognition.start(); });
    }

    // 6. THE BACKDOOR (Secret Routing to Master Node)
    // Clicking the STEVE node 3 times within 2 seconds redirects to master.html
    const steveNode = document.getElementById('steve-node');
    let clickCount = 0;
    let clickTimer = null;

    if (steveNode) {
        steveNode.addEventListener('click', () => {
            clickCount++;
            
            if (clickCount === 1) {
                // Manually activating standard log on first click
                steveNode.classList.add('activated');
                appendTerminalRow("STEVE Node accessed manually.", true);
                
                clickTimer = setTimeout(() => {
                    clickCount = 0; // Reset if not clicked 3 times fast enough
                }, 2000);
            } else if (clickCount === 3) {
                clearTimeout(clickTimer);
                appendTerminalRow("OVERRIDE ACCEPTED. Rerouting to Master Control...", true);
                
                // Flash the screen red/cyan and redirect to the secure environment
                document.body.style.transition = "background-color 0.5s";
                document.body.style.backgroundColor = "#ff004c";
                
                setTimeout(() => {
                    // This file should live in your secure folder/repo
                    window.location.href = "master.html";
                }, 600);
            }
        });
    }
});
