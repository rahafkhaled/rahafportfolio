$(document).ready(function() {
    var dragging = false;
    var resizing = false;
    var offsetX, offsetY;

    // Data array for menu items and details
    var data = [
        {
            type: "Private Sector",
            title: "Digital Solution Implementation",
            sector: "Manufacturing Sector",
            description: "Project Management Support",
            details: "Introducing an automated reporting capability (Jira) within the largest dairy provider in New Zealand to support the delivery of a digital HR system (SAP Successfactors, ServiceNow)",
            imgSrc: "images/ey.png"
        },
        {
            type: "Public Sector",
            title: "Digital Transformation Programme",
            sector: "Transport Sector",
            description: "Various Roles",
            details: "• Transition support – supported the detailed planning and transition of digital assets between two public sector organisations\n• Scrum support – supported the implementation and adoption of agile tooling within the programme (Jira)\n• Planning and monitoring – supported the Programme Scheduler in embedding an organisational shift from a siloed to integrated planning and delivery approach\n• Cutover support – supported the orchestration of the cutover period for critical programme releases\n• Handover support – engaged with BAU squad and leadership to support the handover of the digital platform to BAU\n• Hypercare data analyst – developed operational reporting dashboards during the hypercare window",
            imgSrc: "images/ey.png"
        },
        {
            type: "Public Sector",
            title: "Technology Strategy",
            sector: "Public Service",
            description: "Current State Analyst",
            details: "Current state analysis to develop a roadmap to deliver a digital transformation for a local trust in New Zealand.",
            imgSrc: "images/ey.png"
        },
        {
            type: "Public Sector",
            title: "Cloud Data Programme",
            sector: "Government",
            description: "Indigenous Data Analyst",
            details: "Developed and piloted a data tagging system to identify, classify and govern indigenous data within a New Zealand government ministry on the Snowflake platform.",
            imgSrc: "images/ey.png"
        },
        {
            type: "Public Sector",
            title: "Digital Implementation Planning",
            sector: "Education Sector",
            description: "Delivery Support",
            details: "Developed a framework for the piloting of new modes of education delivery within a New Zealand public sector organisation.",
            imgSrc: "images/ey.png"
        },
        {
            type: "Private Sector",
            title: "Full Stack Web Development",
            sector: "Small businesses",
            description: "Web Developer",
            details: "Involves the design and implementation of full stack web-based solutions for small companies as well as the idea formulation of design assets for use both physically and digitally.",
            imgSrc: "images/sy.png"
        },
        {
            type: "Private Sector",
            title: "Private School Marketing Department",
            sector: "Education Sector",
            description: "Marketing Assistant",
            details: "Involved the shadowing and assistance of the Head of Communications in an international school setting. Included the learning of industry standards for Digital Marketing resources, as well as meeting with clients and implementation and development of campaigns for events.",
            imgSrc: "images/dss.png"
        }
    ];

    // Populate menu items and details dynamically
    var $menu = $('.menu');
    var $details = $('.details');

    data.forEach(function(item, index) {
        var menuItem = `
            <div class="items" data-details="details${index + 1}">
                <div class="item-content">
                    <div class="text-content">
                        <h3>${item.description}</h3>
                        <p>${item.title}</p>
                    </div>
                    <div class="image-content">
                        <img src="${item.imgSrc}" alt="${item.title} Icon">
                    </div>
                </div>
            </div>
        `;

        var detailItem = `
            <div id="details${index + 1}" class="detail-content">
                <h3>${item.description} - ${item.title}</h3>
                <h5>${item.details.replace(/\n/g, '<br>')}</h5>
            </div>
        `;

        $menu.append(menuItem);
        $details.append(detailItem);
    });

    // Data array for tray icons
    var trayData = [
        {
            title: "Projects",
            imgSrc: "images/appstore.png"
        },
        {
            title: "About me",
            imgSrc: "images/person.png"
        },
        {
            title: "Photos",
            imgSrc: "images/photos.png"
        },
        {
            title: "Contact Me",
            imgSrc: "images/contact.png"
        }
    ];

    // Function to generate dynamic onclick function name
    function generateOnClickFunctionName(title) {
        return title.replace(/\s+/g, '') + 'Open';
    }

    // Populate tray icons dynamically
    var $tray = $('.tray');

    trayData.forEach(function(item) {
        var onClickFunction = generateOnClickFunctionName(item.title);
        var trayItem = `
            <div class="icon" onclick="${onClickFunction}()">
                <h4 class="header">${item.title}</h4>
                <div class="triangle"></div>
                <img src="${item.imgSrc}" alt="${item.title} Icon">
            </div>
        `;
        $tray.append(trayItem);
    });

    // Make windows draggable and resizable
    $('.window').on('mousedown', function(e) {
        var $window = $(this);
        var isResizing = e.target === this && (
            e.offsetX > $window.width() - 10 || e.offsetY > $window.height() - 10
        );

        if (isResizing) {
            resizing = true;
            return;
        }

        e.preventDefault();
        dragging = true;
        var homepageOffset = $('.homepage').offset();
        offsetX = e.pageX - homepageOffset.left - $window.position().left;
        offsetY = e.pageY - homepageOffset.top - $window.position().top;

        $(document).on('mousemove', function(e) {
            if (dragging) {
                var homepageOffset = $('.homepage').offset();
                var taskbarHeight = $('.taskbar').outerHeight();
                var newLeft = e.pageX - homepageOffset.left - offsetX;
                var newTop = e.pageY - homepageOffset.top - offsetY + taskbarHeight;

                var homepageWidth = $('.homepage').width();
                var homepageHeight = $('.homepage').height();
                var windowWidth = $window.width();
                var windowHeight = $window.height();

                newLeft = Math.max(0, Math.min(newLeft, homepageWidth - windowWidth));
                newTop = Math.max(taskbarHeight, Math.min(newTop, homepageHeight - windowHeight + taskbarHeight));

                $window.css({
                    left: newLeft + 'px',
                    top: newTop + 'px'
                });
            } else if (resizing) {
                var newWidth = e.pageX - $window.offset().left;
                var newHeight = e.pageY - $window.offset().top;

                $window.css({
                    width: newWidth + 'px',
                    height: newHeight + 'px'
                });
            }
        });

        $(document).on('mouseup', function() {
            dragging = false;
            resizing = false;
            $(document).off('mousemove');
        });
    });

    $('.tray .icon').hover(
        function() {
            $(this).css('transform', 'scale(1.15)');
            $(this).prev().css('transform', 'scale(1.1)');
            $(this).next().css('transform', 'scale(1.1)');
            $(this).prev().prev().css('transform', 'scale(1.05)');
            $(this).next().next().css('transform', 'scale(1.05)');
        },
        function() {
            $(this).css('transform', 'scale(1)');
            $(this).prev().css('transform', 'scale(1)');
            $(this).next().css('transform', 'scale(1)');
            $(this).prev().prev().css('transform', 'scale(1)');
            $(this).next().next().css('transform', 'scale(1)');
        }
    );

    // Click event for menu items
    $(document).on('click', '.menu .items', function() {
        var detailsId = $(this).data('details');
        $('.detail-content').hide();
        $('#' + detailsId).show();
    });

    // Hide all details initially
    $('.detail-content').hide();
});

// Dynamic functions based on titles
function ProjectsOpen() {
    $("#projects-window").css("display", "block");
}

function DocumentsOpen() {
    $("#documents-window").css("display", "block");
}

function SettingsOpen() {
    $("#settings-window").css("display", "block");
}

function HelpOpen() {
    $("#help-window").css("display", "block");
}

function windowClose(windowId) {
    $("#" + windowId).css("display", "none");
}
