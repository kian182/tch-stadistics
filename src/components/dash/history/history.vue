<template>
  <div class="container">

    <!-- Page Heading -->
    <h1 class="my-4">Page Heading
      <small>Secondary Text</small>
    </h1>

    <!--<form action="http://10.100.154.253:8000/file/upload" enctype="multipart/form-data" method="post">-->
      <!--<input type="file" name="file-to-upload">-->
      <!--<input type="submit" value="Upload">-->
    <!--</form>-->

    <form id="uploadForm"
          enctype="multipart/form-data"
          action="http://10.100.154.253:8000/file/upload"
          method="post">
      <input type="file" name="file-to-upload" multiple />
      <input type="submit" value="Upload Image" name="submit">
      <!--<input type='text' id='random' name='random'><br>-->
      <span id = "status"></span>
    </form>

    <!-- /.row -->

    <!--<div class="container">-->
      <!--<div class="large-12 medium-12 small-12 cell">-->
        <!--<label>File-->
          <!--<input type="file" id="file" name="file-to-upload" ref="file" v-on:change="handleFileUpload()"/>-->
        <!--</label>-->
        <!--<button v-on:click="submitFile()">Submit</button>-->
      <!--</div>-->
    <!--</div>-->


  </div>
  <!-- /.container -->
</template>

<script src="./history.js"></script>
<style lang="scss" src="./history.scss"></style>
