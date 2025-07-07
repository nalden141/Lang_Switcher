frappe.provide("frappe.lang_switcher");

frappe.lang_switcher = {
	init: function () {
		this.create_lang_switcher();
		this.bind_events();
	},

	create_lang_switcher: function () {
		const navbar_right = $("#navbar-breadcrumbs + .navbar-collapse .navbar-nav");
		const lang_switcher = $(`
 			<li class="nav-item dropdown dropdown-help dropdown-mobile d-none d-lg-block">
                <button class="btn-reset nav-link" data-toggle="dropdown" aria-controls="language_dropdown" aria-label="Language Dropdown" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe-icon lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                </button>       
            
                <div class="dropdown-menu dropdown-menu-right" id="languages_dropdown" role="menu">        
               
                </div>
            </li>
        `);

		navbar_right.prepend(lang_switcher);

		this.populate_languages();
	},

	populate_languages: async function () {
		await frappe.call({
			method: "frappe.client.get_list",
			args: {
				doctype: "Language",
				filters: {
					custom_lang_switcher: 1,
				},
				fields: ["name", "language_name"],
			},
			callback: (response) => {
				const languages = response.message || [];
				const dropdown_content = $("#languages_dropdown");

				for (const lang of languages) {
					const lang_item = $(`
                        <a class="dropdown-item language-switcher" href="javascript:;" data-lang_code="${lang.name}">
                            ${lang.language_name}
                        </a>
                    `);

					dropdown_content.prepend(lang_item);
				}
			},
		});
	},

	bind_events: function () {
		const me = this;

		$(document).on("click", ".language-switcher", function () {
			const lang_code = $(this).data("lang_code");
			me.change_language(lang_code);
		});
	},

	change_language: async (lang_code) => {
		const userResponse = await frappe.call({
			method: "frappe.client.set_value",
			args: {
				doctype: "User",
				name: frappe.session.user,
				fieldname: "language",
				value: lang_code,
			},
		});

		

		frappe.ui.toolbar.clear_cache();
	
	},
};

$(document).ready(function () {
	frappe.lang_switcher.init();
});
