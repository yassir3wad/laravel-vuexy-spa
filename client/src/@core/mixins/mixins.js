export default {
	methods: {
		handleResponseError(error, ref) {
			if (error.response) {
				if (error.response.status === 422) {
					let $errors = error.response.data.errors;
					if (ref) {
						ref.setErrors($errors);
					}
					this.showErrorsInToastr($errors);
				} else {
					this.toast('danger', 'Error', error.response.data.message);
				}
			}
		},
		showErrorsInToastr($errors) {
			const h = this.$createElement;
			let $items = [];
			let $key_errors = Object.keys($errors);

			$key_errors.forEach((x) => {
				let $x = $errors[x][0];
				if ($x) {
					$items.push(h('li', `${$x}`));
				}
			});

			if ($items.length) {
				this.toast('danger', 'Error', h('ul', $items))
			}
		},
		toast(variant, title, message) {
			this.$bvToast.toast(message, {
				title: title,
				variant: variant,
				solid: true,
				autoHideDelay: 5000,
			});
		},
	}
}