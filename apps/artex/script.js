const chat_input = document.getElementById("chat-input")
const messages_box = document.getElementById("messages-box")

const add_message = (msg) => {
    const parser = new DOMParser();

    const doc = parser.parseFromString(msg, 'text/html');

    let p = document.createElement("p");
    p.innerHTML = doc.body.innerHTML;

    let code = p.querySelectorAll("code");

    if (code.length >= 1) {
        code.forEach(cd => {
            let tg = cd.parentElement;
            let div = document.createElement("div");
            div.classList.add("code-block");
            let header = document.createElement("div");
            header.classList.add("header");
            let header_p1 = document.createElement("p");
            console.log(cd.classList[0])
            header_p1.textContent = cd.classList[0].split("-")[1];
            let copy = document.createElement("div");
            copy.id = "copy";
            let img = document.createElement("img");
            img.src = "../../assets/apps/default/artex/assets/copy.png";
            let copy_text = document.createElement("p");
            copy_text.textContent = "copy";
            copy.appendChild(img);
            copy.appendChild(copy_text);
            header.appendChild(header_p1);
            header.appendChild(copy);
            let block = document.createElement("div");
            block.classList.add("block");
            let pre = document.createElement("pre");
            let code_tg = document.createElement("code");
            code_tg.innerHTML = cd.innerHTML;
            pre.appendChild(code_tg);
            block.appendChild(pre);
            div.appendChild(header);
            div.appendChild(block);
            
            // Replace tg with div
            tg.replaceWith(div);
        });
    }
    
    let md = document.createElement("div")
    md.classList.add("ai")
    let imgm = document.createElement("img")
    imgm.src = "../../assets/apps/default/artex/assets/bot.png"
    md.appendChild(imgm)
    md.appendChild(p)
    messages_box.appendChild(md)
}

// add_message(`<div class="ai">
// <img src="../../assets/apps/default/artex/assets/bot.png" alt="" />
// <p>
//   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
//   quasi nulla porro animi sint nihil totam esse illum tempore
//   voluptates.
// </p>
// </div>`)

// add_message(`<div class="ai user">
// <img src="../../assets/apps/default/artex/assets/user.png" alt="" />
// <p>
//   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
//   quasi nulla porro animi sint nihil totam esse illum tempore
//   voluptates.lorem30 Lorem ipsum dolor sit amet consectetur
//   adipisicing elit. Architecto molestiae ipsa ducimus doloribus est
//   reiciendis nam hic! Neque, cum nihil. Quasi fugiat assumenda
//   numquam dignissimos in nulla inventore sunt sapiente.
// </p>
// </div>`)

let elm = `<pre><code class="language-python"># This code prints any data.

# Define a function to print data
def print_data(data):

  # Print the data
  print(data)

# Driver code
data = &quot;Hello World!&quot; 
def asian():
  print("tony stark") #try at Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus cumque eaque eveniet totam numquam modi eum sunt exercitationem architecto doloremque quibusdam quidem adipisci, illo unde? Culpa vero sint velit vel.
print_data(data)
</code></pre>
<p>This code will print the following output:</p>
<pre><code class="language-html">Hello World!
</code></pre>`;

add_message(elm)